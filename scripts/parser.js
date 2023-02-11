/**
 * DOMAIN-SET TO FILTER-RULE *
 */

$notify($resource.content)

POLICY(DOMAIN($resource.content))

/**
 * CONVERTED DOMAIN
 * 
 * @param {string} content Original content
 * @returns Converted content
 */
function DOMAIN(content) {
    const list = content.split('\n').filter(ctx => {
        const check = (value) => ctx.indexOf(value) != -1
        return ctx.trim() && !['//', '#', ';'].some(check)
    }).map(ctx => {
        if (ctx.includes(',')) {
            return ctx
        } else if (ctx[0] == '.') {
            return `HOST-SUFFIX,${ctx.slice(1, ctx.length)}`
        } else {
            return `HOST,${ctx}`
        }
    })
    return list.join('\n')
}

/**
 * ADD POLICY
 * 
 * @param {string} content Original content
 * @returns Converted content
 */
function POLICY(content) {
    const types = ['host', 'host-suffix', 'host-wildcard', 'host-keyword', 'user-agent', 'ip-cidr', 'ip6-cidr', 'geoip', 'ip-asn']
    const list = content.split('\n').filter(ctx => {
        const check = (value) => ctx.toLowerCase().indexOf(value) != -1
        return types.some(check)
    }).map(ctx => `${ctx},Shawn`)
    return list.join('\n')
}
