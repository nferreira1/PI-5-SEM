MAKEFLAGS += --no-print-directory

PRIVATE_KEY = keys/private.key
PUBLIC_KEY = keys/public.key

gkeys:
	@if [ ! -s $(PRIVATE_KEY) ] || [ ! -s $(PUBLIC_KEY) ]; then \
		echo "🔄 Arquivos vazios ou ausentes. Gerando novas chaves..."; \
		mkdir -p keys; \
		openssl genpkey -algorithm RSA -out $(PRIVATE_KEY); \
		openssl rsa -in $(PRIVATE_KEY) -pubout -out $(PUBLIC_KEY); \
		echo "✅ Chaves geradas em keys"; \
	else \
		echo "⚡ Chaves já existem e não estão vazias. Nenhuma ação necessária."; \
	fi
