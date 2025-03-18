MAKEFLAGS += --no-print-directory

.PHONY: all checks init_status check-go check-java check-bun init_services run-services

PRIVATE_KEY = keys/private.key
PUBLIC_KEY = keys/public.key

TOTAL = 3
TMP_STATUS = /tmp/install_status.txt

SERVICES_TOTAL = 2
TMP_SERVICES = /tmp/service_status.txt
IDENTITY_PORT = 8080
ORDER_PORT = 3000

define PRINT_ALL
	clear; \
	INSTALLED_DEP=$$(grep '^✅' $(TMP_STATUS) 2>/dev/null | wc -l); \
	echo "[+] Instalando $$INSTALLED_DEP/$(TOTAL)"; \
	echo ""; \
	cat $(TMP_STATUS); \
	echo ""; \
	INSTALLED_SVC=$$(grep '^✅' $(TMP_SERVICES) 2>/dev/null | wc -l); \
	echo "[+] Serviços $$INSTALLED_SVC/$(SERVICES_TOTAL)"; \
	echo ""; \
	cat $(TMP_SERVICES);
endef

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

all: init_services init_status checks run-services

init_status:
	@rm -f $(TMP_STATUS)
	@echo "- Go                        Aguardando" >> $(TMP_STATUS)
	@echo "- Java                      Instalando" >> $(TMP_STATUS)
	@echo "- Bun                       Instalando" >> $(TMP_STATUS)

init_services:
	@rm -f $(TMP_SERVICES)
	@echo "- Identity Service          Aguardando" >> $(TMP_SERVICES)
	@echo "- Order Service             Aguardando" >> $(TMP_SERVICES)

checks: check-go check-java check-bun
	@$(PRINT_ALL)

check-go:
	@sed -i 's/^- Go.*/- Go                        Instalando/' $(TMP_STATUS)
	@if ! command -v go > /dev/null 2>&1; then \
	    START=$$(date +%s); \
	    sudo apt update -y > /dev/null 2>&1 && sudo apt install -y golang-go > /dev/null 2>&1; \
	    END=$$(date +%s); \
	    TIME=$$((END - START)); \
	    FORMATTED=$$(printf "✅ %-25sInstalado  %3ds" "Go" "$$TIME"); \
	    sed -i "s/^- Go.*/$$FORMATTED/" $(TMP_STATUS); \
	else \
	    FORMATTED=$$(printf "✅ %-25sInstalado" "Go"); \
	    sed -i "s/^- Go.*/$$FORMATTED/" $(TMP_STATUS); \
	fi; \
	$(PRINT_ALL)

check-java:
	@sed -i 's/^- Java.*/- Java                      Instalando/' $(TMP_STATUS)
	@if ! command -v java > /dev/null 2>&1; then \
	    START=$$(date +%s); \
	    sudo apt update -y > /dev/null 2>&1 && sudo apt install -y openjdk-17-jdk > /dev/null 2>&1; \
	    END=$$(date +%s); \
	    TIME=$$((END - START)); \
	    FORMATTED=$$(printf "✅ %-25sInstalado  %3ds" "Java" "$$TIME"); \
	    sed -i "s/^- Java.*/$$FORMATTED/" $(TMP_STATUS); \
	else \
	    FORMATTED=$$(printf "✅ %-25sInstalado" "Java"); \
	    sed -i "s/^- Java.*/$$FORMATTED/" $(TMP_STATUS); \
	fi; \
	$(PRINT_ALL)

check-bun:
	@sed -i 's/^- Bun.*/- Bun                       Instalando/' $(TMP_STATUS)
	@if ! command -v bun > /dev/null 2>&1; then \
	    START=$$(date +%s); \
	    curl -fsSL https://bun.sh/install | bash > /dev/null 2>&1; \
	    END=$$(date +%s); \
	    TIME=$$((END - START)); \
	    FORMATTED=$$(printf "✅ %-25sInstalado  %3ds" "Bun" "$$TIME"); \
	    sed -i "s/^- Bun.*/$$FORMATTED/" $(TMP_STATUS); \
	else \
	    FORMATTED=$$(printf "✅ %-25sInstalado" "Bun"); \
	    sed -i "s/^- Bun.*/$$FORMATTED/" $(TMP_STATUS); \
	fi; \
	$(PRINT_ALL)

run-services:
	@bash -c ' \
	    clear; \
	    echo "[+] Instalando 3/3"; \
	    echo ""; \
	    cat $(TMP_STATUS); echo ""; \
	    echo "[+] Serviços 0/2"; \
	    echo ""; \
	    cat $(TMP_SERVICES); echo ""; \
	    (cd services/identity && ./mvnw spring-boot:run "-Dspring-boot.run.profiles=dev" > /dev/null 2>&1) & \
	    PID1=$$!; \
	    sleep 1; \
	    COUNT=0; MAX=60; \
	    while ! lsof -i :$(IDENTITY_PORT) > /dev/null && [ $$COUNT -lt $$MAX ]; do \
	        sleep 1; COUNT=$$((COUNT+1)); \
	    done; \
	    if lsof -i :$(IDENTITY_PORT) > /dev/null; then \
	        sed -i "s/^- Identity Service.*/✅ Identity Service         http:\/\/localhost:$(IDENTITY_PORT)/" $(TMP_SERVICES); \
	    else \
	        sed -i "s/^- Identity Service.*/❌ Identity Service         Erro ao iniciar/" $(TMP_SERVICES); \
	    fi; \
	    clear; \
	    echo "[+] Instalando 3/3"; \
	    echo ""; \
	    cat $(TMP_STATUS); echo ""; \
	    echo "[+] Serviços 1/2"; \
	    echo ""; \
	    cat $(TMP_SERVICES); echo ""; \
	    (cd services/order && npm start > /dev/null 2>&1) & \
	    PID2=$$!; \
	    sleep 1; \
	    COUNT=0; MAX=60; \
	    while ! lsof -i :$(ORDER_PORT) > /dev/null && [ $$COUNT -lt $$MAX ]; do \
	        sleep 1; COUNT=$$((COUNT+1)); \
	    done; \
	    if lsof -i :$(ORDER_PORT) > /dev/null; then \
	        sed -i "s/^- Order Service.*/✅ Order Service            http:\/\/localhost:$(ORDER_PORT)/" $(TMP_SERVICES); \
	    else \
	        sed -i "s/^- Order Service.*/❌ Order Service            Erro ao iniciar/" $(TMP_SERVICES); \
	    fi; \
	    clear; \
	    echo "[+] Instalando 3/3"; \
	    echo ""; \
	    cat $(TMP_STATUS); echo ""; \
	    echo "[+] Serviços 2/2"; \
	    echo ""; \
	    cat $(TMP_SERVICES); echo ""; \
	    echo "[+] Serviços rodando. Pressione Ctrl+C para encerrar..."; \
	    trap "echo \"Encerrando serviços...\"; kill $$PID1 $$PID2; exit 0" SIGINT; \
	    wait; \
	'
