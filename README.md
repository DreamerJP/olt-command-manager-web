# 🌐 OLT Manager (Web Version)

![Status](https://img.shields.io/badge/Status-Stable-success) ![Version](https://img.shields.io/badge/Version-1.6-blue) ![License](https://img.shields.io/badge/License-MIT-green)

O **OLT Manager** é uma aplicação web poderosa e leve projetada para simplificar a administração de OLTs (**Huawei**, **ZTE** e **Fiberhome**). Ele gera automaticamente scripts de comando complexos através de uma interface moderna, intuitiva e totalmente responsiva.

> **Nota:** Esta é a evolução web da antiga versão em Python/Tkinter, trazendo melhorias de interface, portabilidade e novas ferramentas.

---

## ✨ Funcionalidades Principais

### 🚀 Geração Dinâmica de Comandos

- Selecione sua OLT e o comando desejado.
- Preencha os parâmetros e veja o script ser montado em tempo real.
- **Validação Automática**: Campos como MAC Address e Serial Number são validados enquanto você digita.

### 🧠 Auto-Fill Inteligente

- Copie e cole sequências como `1/2/3:10` ou `1-2-3-10` no campo **SLOT**.
- O sistema detecta automaticamente e preenche os campos **Porta**, **PON** e **ID**.

### 🛠️ Suporte Multi-Vendor

Compatibilidade nativa com os principais modelos do mercado:

- **Huawei** (MA5800/5600)
- **ZTE** (C300/C600 - Firmware ULLYSES/ITAUM)
- **Fiberhome** (AN5516)

### 📦 Ferramenta de Conversão em Lote

- Precisa remover 50 ONUs de uma vez?
- Cole logs brutos, tabelas ou emails no **Conversor de Lote**.
- O sistema filtra automaticamente as ONUs válidas e gera um script limpo para remoção em massa.

### 📱 Design Responsivo e Moderno

- Interface escura (**Dark Mode**) inspirada em dashboards modernos.
- Totalmente compatível com celulares e tablets (Menu Mobile, Grids Adaptáveis).

---

## 📸 Capturas de Tela

|                Desktop Dashboard                 |        Ferramenta de Lote        |          Mobile View          |
| :----------------------------------------------: | :------------------------------: | :---------------------------: |
| _Interface principal com terminal e parâmetros._ | _Conversor inteligente de logs._ | _Menu responsivo e adaptado._ |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semantic**: Estrutura sólida.
- **CSS3 Moderno**: Variáveis (Custom Properties), Flexbox, Grid Layout e Media Queries.
- **Vanilla JavaScript (ES6+)**: Lógica rápida, sem frameworks pesados, rodando direto no navegador.
- **Icons**: SVG nativo para máxima nitidez (sem dependência de fontes externas).

---

## 🚀 Como Usar

Não é necessário instalar Python, Node.js ou servidores web.

1. Baixe a pasta do projeto.
2. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox).
3. Pronto! O sistema roda localmente e offline.

---

## 👤 Autor

Desenvolvido por **Dreamer**.

📧 **Contato:** [DreamerJPMG@gmail.com](mailto:DreamerJPMG@gmail.com)

---

_Feito com foco em produtividade para provedores de internet (ISPs)._
