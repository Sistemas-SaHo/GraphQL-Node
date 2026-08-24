#! /bin/bash

IMAGES=(
    "app=registrygitlab.ssaver.gob.mx/graphql/api-graphql/app:latest=Dockerfile"
    "proxy=registrygitlab.ssaver.gob.mx/graphql/api-graphql/proxy:latest=Dockerfile-proxy"
)

GREEN="\033[1;32m"
YELLOW="\033[1;33m"
BLUE="\033[1;36m"
RED="\033[1;31m"
NC="\033[0m"

function header() {
    echo -e "${BLUE}############################################"
    echo -e "$1"
    echo -e "############################################${NC}"
}

function modo_uso() {
    echo -e "${BLUE}Modo de uso:"
    echo -e "${BLUE}bash build.sh directorio prod | test";
}

function build_image() {
    local name="$1"
    local tag="$2"
    local dockerfile="$3"
    local public_base="$4"
    
    header "Construyendo imagen: $name con tag: $tag"
    
    docker buildx build -f "infra/$dockerfile" -t "$tag" --cache-from type=registry,ref="$tag" --cache-to type=inline --push . || {
        echo -e "${RED}Error construyendo imagen $name${NC}"
        exit 1
    }
    
    echo -e "${GREEN} Construcción de $name terminada${NC}"
}

[ "$1" ] ||  { echo -e "${RED}Asigna el entorno a construir"; modo_uso; exit 1; }

if [ "$1" = "prod" ]; then
    cat infra/environments/produccion/.env > .env
    git checkout main && git pull
elif [ "$1" = "test" ]; then 
    cat infra/environments/preproduccion/.env > .env
    git checkout develop && git pull
else
    echo "El entorno debe ser prod o test"
    exit 1
fi

cat infra/configs/default.conf > default.conf

for row in "${IMAGES[@]}"; do
    name=$(echo "$row" | cut -d'=' -f1)
    image=$(echo "$row" | cut -d'=' -f2)
    file=$(echo "$row" | cut -d'=' -f3)

    if [ "$1" = "prod" ]; then
        tag_assign="$image"
    else
        tag_assign="$image-test"
    fi

    build_image "$name" "$tag_assign" "$file"
done

rm .env default.conf
