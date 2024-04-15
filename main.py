import asyncio
import logging
import os
import time
from argparse import ArgumentParser
from enum import Enum

import httpx
from colorlog import ColoredFormatter
from retrying import retry


class Url(Enum):
    TGBOT = 'https://api.telegram.org'
    VIKI = 'https://60s.viki.moe'
    HOT = 'https://api.gumengya.com'


origins = [
    {'label': '百度', 'value': 'Baidu'},
    {'label': '百度贴吧', 'value': 'BaiduTieBa'},
    {'label': '抖音', 'value': 'DouYin'},
    {'label': '搜狗', 'value': 'SoGou'},
    {'label': '360', 'value': 'So'},
    {'label': '微博', 'value': 'WeiBo'},
    {'label': '知乎', 'value': 'ZhiHu'},
    {'label': '今日头条', 'value': 'TouTiao'},
    {'label': '快手', 'value': 'KuaiShou'},
    {'label': '哔哩哔哩', 'value': 'BiliBli'},
]


def get_logger():
    logger = logging.getLogger(__name__)
    level = logging.INFO
    logger.setLevel(level)
    fmt = '%(log_color)s %(asctime)s [%(levelname)s] %(message)s'
    formatter = ColoredFormatter(fmt)
    handler = logging.StreamHandler()
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger


def get_args():
    parser = ArgumentParser()
    parser.add_argument('-t', '--token', help='Telegram bot token')
    parser.add_argument('-i', '--id', help='Telegram bot chat id')
    parser.add_argument('-s', '--show', action='store_true', )
    return parser.parse_args()


@retry()
def set_notify(text: str):
    bot_token = os.getenv('TG_BOT_TOKEN') or args.token
    chat_id = os.getenv('TG_CHAT_ID') or args.id
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown"
    }
    with httpx.Client() as client:
        result = client.post(url=f'{Url.TGBOT.value}/bot{bot_token}/sendMessage', data=payload)
        code = result.status_code
        json: dict = result.json()
        if code == 200:
            log.info(f'推送成功')
            return json
        else:
            log.warning(result)


def render_msg(result: dict, index: int):
    code = result['code']
    origin = origins[index]
    if code == 200:
        data_list: list[dict] = result['data']
        log.info(f'获取到{origin['label']}热搜')
        msg = f'## {origin['label']}\n\n'
        for data in data_list:
            msg += f'{data_list.index(data) + 1}. [{data['title']}]({data['url']}) 🔥{data['hot']}\n'
        return msg
    else:
        log.warning(f'获取{origin['label']}热搜失败')


@retry()
async def fetch(session: httpx.AsyncClient, url: str):
    response = await session.get(url=url, follow_redirects=True)
    code = response.status_code
    json: dict = response.json()
    if code == 200:
        log.debug(json)
        return json


def news():
    news_name = '60s看天下'
    response = httpx.get(url=Url.VIKI.value)
    code = response.status_code
    json: dict = response.json()
    if code == 200:
        log.info(f'获取到{news_name}')
        data: list[str] = json['data']
        message = f'## {news_name}\n\n'
        for msg in data:
            log.info(msg)
            message += f'{msg}\n'
        set_notify(message)


async def main():
    async with httpx.AsyncClient() as session:
        urls = [f'{Url.HOT.value}/api/{origin['value']}Hot' for origin in origins]
        tasks = [fetch(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        messages = [render_msg(result, results.index(result)) for result in results]
        for message in messages:
            time.sleep(1)
            set_notify(message)


if __name__ == '__main__':
    try:
        log = get_logger()
        args = get_args()
        if args.show:
            log.info(f'获取热搜中...')
            asyncio.run(main())
        news()

    except KeyboardInterrupt as err:
        raise
