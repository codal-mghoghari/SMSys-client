const trigger = require('./index.js')

async function main() {
    const event = {
        type: 'TOKEN',
        methodArn: 'https://z49f09807g.execute-api.ap-south-1.amazonaws.com/latest/api/login',
        authorizationToken:
            'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IngyZzNvQ01xMXNVOUhZVTBINnJrNVh1MG5lNCIsInBpLmF0bSI6ImJvaGQifQ.eyJzY29wZSI6Im9wZW5pZCIsImF1dGhvcml6YXRpb25fZGV0YWlscyI6W10sImNsaWVudF9pZCI6InNpdGthZ2VhcnVzX2xvZ2luIiwiYmlnQ29tbUN1c3RvbWVySUQiOiIxIiwic3ViIjoiYWJoYWxzb2Qrc2l0a2FAY29kYWwuY29tIiwiZmVkZXJhdGVkSUQiOiJhZDBiY2YyNS01MzllLTRlZTMtYjNkMS00MTVjN2VlODQyMjgiLCJjaGFubmVsIjoic2l0a2FnZWFydXMiLCJ0b2tlbl9yZWdpb24iOiJub3J0aGFtZXJpY2EiLCJjb3VudHJ5T2ZSZXNpZGVuY2UiOiJVUyIsImVudHJ5X3R5cGUiOiJjb25zdW1lciIsImFjY291bnRfc2NvcGUiOiJzaXRrYWdlYXJ1c19iMmMiLCJleHAiOjE2ODM3MDgwODh9.Cv1UHLEE4Q2cifwKteTftf1JpRPuo42SMhsK9XMSmfNHMdudlvULbmzjYZyF4Y31kU2pkU55dgyF5F3KHpP-2us19-RmTQ9OTdxOkRo5haP0RIf0sJlvlO-KEv5WcJlWiA8n-WlcToAAic2RfV7urS0lYvYNK-GUKDN4B_ryFpe0vaiEM9hxVsu6nJ57Txm1EKVliwYVrdPqaLPJuBIkcJpURYDECTaCAo3jC6UOpn6TDVVuvqjGxE6w6Ze0mGnTA1cEpujkh_DOEyb3Wg-Lvwwn0BxSQk0wpMjAInk_yJ-LfutGja9CRTU41YYD5n7N2iivuRGvBzF3koycbuL2Cg',
    }
    trigger.handler(event, {}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log(JSON.stringify(data, null, 4))
        }
    })
}

main()
