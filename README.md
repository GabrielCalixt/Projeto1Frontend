# 🏠 Imobly — Frontend

> Interface web da plataforma **Imobly**: um sistema de gerenciamento de imóveis e proprietários, desenvolvido com HTML, CSS e JavaScript puro.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar](#como-executar)
- [Integração com o Backend](#integração-com-o-backend)
- [Interface da Aplicação](#interface-da-aplicação)

---

## Sobre o Projeto

O frontend da **Imobly** é uma aplicação web simples e funcional que consome a [API Imobly](https://github.com/GabrielCalixt/Projeto1Backend) para exibir, cadastrar e remover imóveis e proprietários. Desenvolvida sem frameworks, utiliza apenas HTML semântico, CSS e JavaScript vanilla para se comunicar com o backend via requisições HTTP.

---

## Funcionalidades

### Imóveis
- **Listar** todos os imóveis cadastrados em uma tabela organizada
- **Cadastrar** um novo imóvel através de um modal com formulário completo
- **Remover** um imóvel diretamente pela tabela
- Exibição de: título, endereço, tipo, status, preço, área, quartos, banheiros e proprietário

### Proprietários
- **Listar** todos os proprietários cadastrados
- **Cadastrar** um novo proprietário via modal

### Interface
- Modais de cadastro acessíveis pelo cabeçalho da página
- Formulários com campos tipados e placeholders informativos

---

## Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| HTML5 | Estrutura semântica da interface |
| CSS3 | Estilização e responsividade |
| JavaScript (Vanilla) | Lógica de interação e consumo da API |

Sem dependências externas — nenhum framework ou biblioteca é necessário.

---

## Estrutura do Projeto

```
Projeto1Frontend/
├── index.html      # Página principal com toda a estrutura da interface
├── scripts.js      # Lógica JavaScript: requisições à API, manipulação do DOM e eventos
├── styles.css      # Estilos visuais da aplicação
└── img/
    └── imobly-icon.svg   # Ícone/favicon da aplicação
```

---

## Como Executar

Não é necessário instalar nada. Basta:

**1. Clone o repositório:**
```bash
git clone https://github.com/GabrielCalixt/Projeto1Frontend.git
cd Projeto1Frontend
```

**2. Abra o arquivo `index.html` diretamente no navegador:**
```bash
# No Windows
start index.html

# No macOS
open index.html

# No Linux
xdg-open index.html
```

> ⚠️ **Atenção:** Para que a aplicação funcione corretamente, o [backend da Imobly](https://github.com/GabrielCalixt/Projeto1Backend) precisa estar em execução localmente na porta 8888.

---

## Integração com o Backend

O frontend se comunica com a API REST do backend via `fetch`. Os endpoints consumidos são:

Certifique-se de que o backend está rodando antes de abrir o frontend. Consulte o [README do backend](https://github.com/GabrielCalixt/Projeto1Backend) para instruções de execução.

---

## Interface da Aplicação

A interface é composta por uma única página (`index.html`) com as seguintes seções:

**Cabeçalho:** Exibe o nome da marca "Imobly" e os botões de ação para abrir os modais de cadastro de proprietário e de imóvel.

**Tabela de Imóveis:** Lista todos os imóveis cadastrados com colunas para título, endereço, tipo, status, preço, área, quartos, banheiros e proprietário.

**Seção de Proprietários:** Lista os proprietários cadastrados na base.

**Modal de Novo Imóvel:** Formulário com os campos título, endereço, tipo (apartamento, casa, comercial ou terreno), status (disponível, alugado ou à venda), valor, área, quartos, banheiros e seleção do proprietário.

**Modal de Novo Proprietário:** Formulário com os campos nome, e-mail e telefone.