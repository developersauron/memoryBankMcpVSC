# Debug Kılavuzu

## MCP Debug Modu

Memory Bank MCP sunucusunda debug loglarını kontrol etmek için `MCP_DEBUG` ortam değişkenini kullanın:

```bash
# Debug loglarını aktif etmek için
export MCP_DEBUG=true

# Veya tek seferlik kullanım için
MCP_DEBUG=true node dist/index.js
```

## Debug Logları

- **Normal mod**: Sadece hatalar ve kullanıcı mesajları gösterilir
- **Debug mod**: Tüm işlem adımları ve dosya yolları loglanır
- Debug logları `stderr` üzerinden gönderilir, böylece MCP protokolü ile karışmaz

## Parse Hatalarını Önleme

Önceki parse hatalarının nedeni:
- `console.log` çıktıları stdout'a gönderiliyordu
- MCP istemcisi bunları protokol mesajı olarak algılıyordu
- Şimdi tüm debug logları `stderr` üzerinden gönderiliyor

## Dosya Güncelleme Sorunları

Artık dosya kaydetme işlemlerinde:
- Her dosya için ayrı try/catch blokları
- Detaylı hata mesajları
- Debug modunda dosya yolları loglanıyor

## Kullanım Örnekleri

```bash
# Normal kullanım (sessiz)
node dist/index.js

# Debug modunda kullanım (detaylı loglar)
MCP_DEBUG=true node dist/index.js
```
