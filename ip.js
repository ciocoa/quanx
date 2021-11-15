if ($response.statusCode != 200) $done(null)
var flags = new Map([
  ['AC', '🇦🇨'],
  ['AF', '🇦🇫'],
  ['AI', '🇦🇮'],
  ['AL', '🇦🇱'],
  ['AM', '🇦🇲'],
  ['AQ', '🇦🇶'],
  ['AR', '🇦🇷'],
  ['AS', '🇦🇸'],
  ['AT', '🇦🇹'],
  ['AU', '🇦🇺'],
  ['AW', '🇦🇼'],
  ['AX', '🇦🇽'],
  ['AZ', '🇦🇿'],
  ['BB', '🇧🇧'],
  ['BD', '🇧🇩'],
  ['BE', '🇧🇪'],
  ['BF', '🇧🇫'],
  ['BG', '🇧🇬'],
  ['BH', '🇧🇭'],
  ['BI', '🇧🇮'],
  ['BJ', '🇧🇯'],
  ['BM', '🇧🇲'],
  ['BN', '🇧🇳'],
  ['BO', '🇧🇴'],
  ['BR', '🇧🇷'],
  ['BS', '🇧🇸'],
  ['BT', '🇧🇹'],
  ['BV', '🇧🇻'],
  ['BW', '🇧🇼'],
  ['BY', '🇧🇾'],
  ['BZ', '🇧🇿'],
  ['CA', '🇨🇦'],
  ['CF', '🇨🇫'],
  ['CH', '🇨🇭'],
  ['CK', '🇨🇰'],
  ['CL', '🇨🇱'],
  ['CM', '🇨🇲'],
  ['CN', '🇨🇳'],
  ['CO', '🇨🇴'],
  ['CP', '🇨🇵'],
  ['CR', '🇨🇷'],
  ['CU', '🇨🇺'],
  ['CV', '🇨🇻'],
  ['CW', '🇨🇼'],
  ['CX', '🇨🇽'],
  ['CY', '🇨🇾'],
  ['CZ', '🇨🇿'],
  ['DE', '🇩🇪'],
  ['DG', '🇩🇬'],
  ['DJ', '🇩🇯'],
  ['DK', '🇩🇰'],
  ['DM', '🇩🇲'],
  ['DO', '🇩🇴'],
  ['DZ', '🇩🇿'],
  ['EA', '🇪🇦'],
  ['EC', '🇪🇨'],
  ['EE', '🇪🇪'],
  ['EG', '🇪🇬'],
  ['EH', '🇪🇭'],
  ['ER', '🇪🇷'],
  ['ES', '🇪🇸'],
  ['ET', '🇪🇹'],
  ['EU', '🇪🇺'],
  ['FI', '🇫🇮'],
  ['FJ', '🇫🇯'],
  ['FK', '🇫🇰'],
  ['FM', '🇫🇲'],
  ['FO', '🇫🇴'],
  ['FR', '🇫🇷'],
  ['GA', '🇬🇦'],
  ['GB', '🇬🇧'],
  ['HK', '🇭🇰'],
  ['HU', '🇭🇺'],
  ['ID', '🇮🇩'],
  ['IE', '🇮🇪'],
  ['IL', '🇮🇱'],
  ['IM', '🇮🇲'],
  ['IN', '🇮🇳'],
  ['IS', '🇮🇸'],
  ['IT', '🇮🇹'],
  ['JP', '🇯🇵'],
  ['KR', '🇰🇷'],
  ['LU', '🇱🇺'],
  ['MO', '🇲🇴'],
  ['MX', '🇲🇽'],
  ['MY', '🇲🇾'],
  ['NL', '🇳🇱'],
  ['NO', '🇳🇴'],
  ['PH', '🇵🇭'],
  ['RO', '🇷🇴'],
  ['RS', '🇷🇸'],
  ['RU', '🇷🇺'],
  ['RW', '🇷🇼'],
  ['SA', '🇸🇦'],
  ['SB', '🇸🇧'],
  ['SC', '🇸🇨'],
  ['SD', '🇸🇩'],
  ['SE', '🇸🇪'],
  ['SG', '🇸🇬'],
  ['TH', '🇹🇭'],
  ['TN', '🇹🇳'],
  ['TO', '🇹🇴'],
  ['TR', '🇹🇷'],
  ['TV', '🇹🇻'],
  ['TW', '🇨🇳'],
  ['UK', '🇬🇧'],
  ['UM', '🇺🇲'],
  ['US', '🇺🇸'],
  ['UY', '🇺🇾'],
  ['UZ', '🇺🇿'],
  ['VA', '🇻🇦'],
  ['VE', '🇻🇪'],
  ['VG', '🇻🇬'],
  ['VI', '🇻🇮'],
  ['VN', '🇻🇳'],
  ['ZA', '🇿🇦']
])
var body = $response.body
var obj = JSON.parse(body)
var title = `${flags.get(obj['countryCode'])} ${obj['city']}`
var subtitle = `${obj['isp']} ${obj['org']}`
var ip = obj['query']
var description = `国家: ${flags.get(obj['countryCode'])}${obj['country']}
                   地区: ${obj['regionName']}
                   时区: ${obj['timezone']}
                   IP：  ${obj['query']}
                   运营商: ${obj['isp']}
                   数据中心：${obj['org']}`
$done({ title, subtitle, ip, description })
