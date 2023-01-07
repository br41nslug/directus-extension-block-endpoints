# Directus Extension Block Endpoints
As the name suggests this extension will allow you to block any endpoint with a custom message.

> Tested with Directus 9.22.1

## Installation
- Download or fork the repository
- Install the requirements\
  `npm install`
- Build the extension\
  `npm run build`
- Move the result to your extension folder\
  `mv dist extensions/hooks/directus-extension-block-endpoints`
- Add required environment variables (see below)
- Restart your Directus instance

## Environment Variables
| name                      | type             | default                                        | example            |
|---------------------------|------------------|------------------------------------------------|--------------------|
| BLOCKED_ENDPOINTS_ENABLED | boolean          | true                                           |                    |
| BLOCKED_ENDPOINTS_PATHS   | string\|string[] |                                                | /server/info,/test |
| BLOCKED_ENDPOINTS_STATUS  | number           | 418                                            | 401                |
| BLOCKED_ENDPOINTS_TYPE    | string           | application/json                               |                    |
| BLOCKED_ENDPOINTS_BODY    | string           | { "error": "Page blocked! I\'m a teapot now" } |                    |

## Usages

> warning: This will only block GET requests! but the script should be easy to modify to any METHOD you want (making it configurable seemed like a mess)

To block `/server/info` from exposing info when using Directus API only:

**ENV**
```
BLOCKED_ENDPOINTS_PATHS="/server/info"
BLOCKED_ENDPOINTS_STATUS=401
BLOCKED_ENDPOINTS_TYPE="text/plain"
BLOCKED_ENDPOINTS_BODY="Access Denied!!"
```
**REQUEST**
```
GET /server/info
Access Denied!!
-> 401
```
