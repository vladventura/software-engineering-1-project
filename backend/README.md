# BACKEND

The APIs in server.py act as service layer. Some objects are not implemented due
to nature of time shortage and redundancy after further studying web APIs.

## How To Debug And Test APIS

Use the bellow command
```python -m uvicorn server:app --reload```
You can also send mock request using free application called Postman

## Data Generation

We make a set of dictionaries necessary to generate data base through
data_gen.py. It's much easier to put together a data file together with this
python script instead of directly editing the data.json file.
