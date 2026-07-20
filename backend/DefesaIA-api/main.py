from fastapi import FastAPI

app = FastAPI()

CIDADES = [
    {"nome": "Brusque", "lat": -27.097,  "lon": -48.910},
    {"nome": "Blumenau", "lat": -27.919, "lon": -48.066},
    {"nome": "Itajai", "lat": -27.919, "lon": -48.670},
]

def analizar_risco(dados):
    vento = dados["wind"]["speed"]
    chuva= dados.get("rain", {}).get("1h", 0)

    if vento > 15 and chuva > 10:
        return "Risco FORTE"
    
    if chuva > 20:
        return "Risco MÉDIO"
    
    return "Risco Normal"

@app.get("/monitoramento")
def monitoramento():
    resultado = []

    for cidade in CIDADES:
        # simulado por enquanto
        dados_fake = {
            "wind": {"speed": 10},
            "rain": {"1h": 5}
        }

        risco = analizar_risco(dados_fake)
        
        resultado.append({
            "cidade": cidade["nome"],
            "risco": risco
        })

    return resultado