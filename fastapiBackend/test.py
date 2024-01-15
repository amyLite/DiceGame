import requests

url = "https://sandbox.cashfree.com/pg/orders"

payload = {
    "customer_details": {
        "customer_id": "7112AAA812234",
        "customer_phone": "9898989898"
    },
    "order_currency": "INR",
    "order_amount": 10.34
}
headers = {
    "accept": "application/json",
    "x-api-version": "2022-09-01",
    "content-type": "application/json",
    "x-client-id": "TEST10031150ead2ebdc2bc11afaa03705113001",
    "x-client-secret": "TEST4f4b61afa1c8a1c4734e7ba2c6751885fa99712a"
}

response = requests.post(url, json=payload, headers=headers)
