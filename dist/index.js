"use strict";function e(e,n,t){return e in n?n[e]:t}var n=({init:n},{env:t,logger:o})=>{const r=e("BLOCKED_ENDPOINTS_ENABLED",t,!0),a=e("BLOCKED_ENDPOINTS_PATHS",t,[]),E=e("BLOCKED_ENDPOINTS_STATUS",t,418),i=e("BLOCKED_ENDPOINTS_TYPE",t,"application/json"),s=e("BLOCKED_ENDPOINTS_BODY",t,'{ "error": "Page blocked! I\'m a teapot now" }');return r?0===a.length?o.error('Environment variable "BLOCKED_ENDPOINTS_PATHS" needs to contain at least one path! try: /server/info'):void n("app.before",(({app:e})=>{a.forEach((e=>o.debug(`Blocking route "${e}"`))),e.get(a,((e,n)=>{n.set("Content-Type",i),n.status(E),n.send(s)}))})):o.warn("Block Endpoints extension is disabled")};module.exports=n;