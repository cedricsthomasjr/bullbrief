def map_to_tradingview_exchange(raw_exchange):
    exchange_map = {
        "NYQ": "NYSE",
        "NYE": "NYSE",
        "NYS": "NYSE",
        "NMS": "NASDAQ",
        "NAS": "NASDAQ",
        "NGM": "NASDAQ",
        "ASE": "AMEX",
        "AMX": "AMEX",
        "PCX": "AMEX"
    }
    return exchange_map.get(raw_exchange.upper(), "NASDAQ")
