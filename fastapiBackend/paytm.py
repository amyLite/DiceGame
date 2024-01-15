import requests
import json

# import checksum generation utility
# You can get this utility from https://developer.paytm.com/docs/checksum/
# import paytmchecksum

# initialize a dictionary
paytmParams = dict()

# body parameters
paytmParams["body"] = {

    # Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
    "mid" : "WjKRsk58880453990199",

    # Enter your order id which needs to be check status for
    "orderId" : "202310301200560058",
}

# Generate checksum by parameters we have in body
# Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
# checksum = paytmchecksum.generateSignature(json.dumps(paytmParams["body"]), "YOUR_MERCHANT_KEY")

# head parameters
# paytmParams["head"] = {

#     # put generated checksum value here
#     "signature"	: checksum
# }

# prepare JSON string for request
post_data = json.dumps(paytmParams)

# for Staging
url = "https://securegw.paytm.in/v3/order/status"

# for Production
# url = "https://securegw.paytm.in/v3/order/status"

response = requests.post(url, data = post_data, headers = {"Content-type": "application/json"}).json()

print(response)

