window.OLT_DATA = {
    "ZTE Z600 Itaum": {
        "description": "OLT ZTE ITAUM ZXA10 C600",
        "categories": {
            "Gerenciamento de ONU": {
                "Adicionar ONU": {
                    "_dica": "Na ZTE Z600, o perfil (profile-id) deve existir previamente na OLT. Use 'show gpon onu by sn {sn}' antes para confirmar que a ONU está batendo na PON correta.",
                    "🔍 Passo Inicial: Verificar ONU por SN": "show gpon onu by sn {sn}",
                    "🔍 Passo Inicial: Verificar IDs na PON": "show gpon onu state gpon_olt-{slot}/{porta}/{pon}",
                    "▶ OPÇÃO A: Adicionar ONU L2 (Modo Bridge)": "configure terminal\ninterface gpon_olt-{slot}/{porta}/{pon}\nonu {id} type {tipo} sn {sn}\nexit\ninterface gpon_onu-{slot}/{porta}/{pon}:{id}\nname {nome}\nsn-bind enable sn\ntcont 1 profile INTERNET\ngemport 1 name INTERNET tcont 1\nexit\ninterface vport-{slot}/{porta}/{pon}.{id}:1\nservice-port 1 user-vlan {vlan} vlan {vlan}\nexit\npon-onu-mng gpon_onu-{slot}/{porta}/{pon}:{id}\nvlan port eth_0/1 mode tag vlan {vlan}\nservice 1 gemport 1 vlan {vlan}\nexit\nexit",
                    "▶ OPÇÃO B: Adicionar ONU L3 (Modo Router)": "configure terminal\ninterface gpon_olt-{slot}/{porta}/{pon}\nonu {id} type {tipo} sn {sn}\nexit\ninterface gpon_onu-{slot}/{porta}/{pon}:{id}\nname {nome}\nsn-bind enable sn\ntcont 1 profile INTERNET\ngemport 1 name INTERNET tcont 1\nexit\ninterface vport-{slot}/{porta}/{pon}.{id}:1\nservice-port 1 user-vlan {vlan} vlan {vlan}\nexit\npon-onu-mng gpon_onu-{slot}/{porta}/{pon}:{id}\nservice 1 gemport 1 vlan {vlan}\nwan-ip 1 ipv4 mode pppoe username {pppoe_login} password {pppoe_senha} vlan-profile INT-{vlan} host 1\nsecurity-mgmt 1 state enable ingress-type iphost 1 protocol web\nsecurity-mgmt 1 state enable mode forward ingress-type wan protocol web\nexit\nexit",
                    "💾 Passo Final: Salvar (Obrigatório)": "write",
                    "_aviso": "No Modo Router, o profile 'INT-{vlan}' deve existir na OLT. O campo {tipo} é o modelo da ONU."
                },
                "Consultar ONU": {
                    "Por Serial Number": "show gpon onu by sn {sn}",
                    "Detalhes da ONU": "show gpon onu detail-info gpon_olt-{slot}/{porta}/{pon} {id}",
                    "Estado das ONUs": "show gpon onu state gpon_olt-{slot}/{porta}/{pon}",
                    "MAC da ONU": "show gpon onu mac gpon_olt-{slot}/{porta}/{pon} {id}",
                    "Status PON": "show interface gpon_olt-{slot}/{porta}/{pon}",
                    "Config da PON": "show running-config interface gpon_olt-{slot}/{porta}/{pon}"
                },
                "Remover ONU": {
                    "Por ID": "configure terminal\ninterface gpon_olt-{slot}/{porta}/{pon}\nno onu {id}\nexit\nexit",
                    "Por Serial": "configure terminal\ninterface gpon_olt-{slot}/{porta}/{pon}\nno onu sn {sn}\nexit\nexit"
                },
                "Reiniciar ONU": "configure terminal\ninterface gpon_olt-{slot}/{porta}/{pon}\nonu {id} reboot\nexit\nexit",
                "Atualizar ONU": {
                    "Verificar versão": "show remote-unit information gpon_olt-{slot}/{porta}/{pon} {id}",
                    "Atualizar": "remote-unit update-and-reboot {firmware} gpon_olt-{slot}/{porta}/{pon} {id}",
                    "Status atualização": "show remote-unit update-status gpon_olt-{slot}/{porta}/{pon} {id}"
                }
            },
            "Diagnóstico": {
                "Informações Ópticas": {
                    "Info óptica PON": "show gpon optical-info gpon_olt-{slot}/{porta}/{pon}",
                    "Níveis ópticos ONU": "show gpon onu optical-info gpon_olt-{slot}/{porta}/{pon} {id}",
                    "Distância ONU": "show gpon onu distance gpon_olt-{slot}/{porta}/{pon} {id}"
                },
                "Estatísticas": {
                    "Tráfego PON": "show pon onu statistics gpon_olt-{slot}/{porta}/{pon}",
                    "Tráfego ONU específica": "show pon onu statistics gpon-onu_{slot}/{porta}/{pon}:{id}",
                    "Histórico ONU": "show gpon onu history gpon_olt-{slot}/{porta}/{pon} {id}"
                },
                "Alarmes": "show alarm active"
            },
            "Sistema": {
                "Informações Gerais": {
                    "Versão sistema": "show version",
                    "Lista interfaces": "show interface brief",
                    "Arquivos firmware": "dir /datadisk0/LR0/onuver/"
                },
                "Navegação": {
                    "Modo privilegiado": "enable",
                    "Modo configuração": "configure terminal",
                    "Interface GPON": "interface gpon_olt-{slot}/{porta}/{pon}",
                    "Sair": "exit"
                }
            }
        }
    },
    "ZTE C300 Ullyses": {
        "description": "OLT ZTE ULLYSES",
        "categories": {
            "Gerenciamento de ONU": {
                "Adicionar ONU": {
                    "_dica": "Na ZTE C300, a interface usa gpon-olt_ (com hífen e underline), diferente da Z600 que usa gpon_olt- (underline e hífen). Atenção ao digitar.",
                    "🔍 Passo Inicial: Verificar ONU na PON": "show gpon onu uncfg gpon-olt_{slot}/{porta}/{pon}",
                    "🔍 Passo Inicial: Verificar IDs na PON": "show gpon onu state gpon-olt_{slot}/{porta}/{pon}",
                    "▶ OPÇÃO A: Adicionar ONU L2 (Modo Bridge)": "configure terminal\ninterface gpon-olt_{slot}/{porta}/{pon}\nonu {id} type {tipo} sn {sn}\nexit\ninterface gpon-onu_{slot}/{porta}/{pon}:{id}\ntcont 1 profile INTERNET\ngemport 1 name INTERNET unicast tcont 1\nservice-port 1 vport 1 user-vlan {vlan} vlan {vlan}\nexit\npon-onu-mng gpon-onu_{slot}/{porta}/{pon}:{id}\nservice INTERNET gemport 1 cos 0 vlan {vlan}\nvlan port eth_0/1 mode tag vlan {vlan}\nexit\nexit",
                    "▶ OPÇÃO B: Adicionar ONU L3 (Modo Router c/ PPPoE)": "configure terminal\ninterface gpon-olt_{slot}/{porta}/{pon}\nonu {id} type {tipo} sn {sn}\nexit\ninterface gpon-onu_{slot}/{porta}/{pon}:{id}\ntcont 1 profile INTERNET\ngemport 1 name INTERNET unicast tcont 1\nservice-port 1 vport 1 user-vlan {vlan} vlan {vlan}\nexit\npon-onu-mng gpon-onu_{slot}/{porta}/{pon}:{id}\nservice INTERNET gemport 1 cos 0 vlan {vlan}\nwan-ip 1 ipv4 mode pppoe username {pppoe_login} password {pppoe_senha} vlan-profile INT-{vlan} host 1\nsecurity-mgmt 1 state enable ingress-type iphost 1 protocol web\nsecurity-mgmt 1 state enable mode forward ingress-type wan protocol web\nexit\nexit",
                    "▶ OPÇÃO C: Adicionar ONU L3 (Telefonia / Sem auto-PPPoE)": "configure terminal\ninterface gpon-olt_{slot}/{porta}/{pon}\nonu {id} type {tipo} sn {sn}\nexit\ninterface gpon-onu_{slot}/{porta}/{pon}:{id}\ntcont 1 profile INTERNET\ngemport 1 name INTERNET unicast tcont 1\nservice-port 1 vport 1 user-vlan {vlan} vlan {vlan}\nexit\npon-onu-mng gpon-onu_{slot}/{porta}/{pon}:{id}\nservice 1 gemport 1 vlan {vlan}\nexit\nexit",
                    "💾 Passo Final: Salvar (Obrigatório)": "write",
                    "_aviso": "O {id} deve ser um número livre na PON. Modo PPPoE configurará a WAN internamente via OMCI."
                },
                "Consultar ONU": {
                    "Por Serial Number": "show gpon onu by sn {sn}",
                    "Detalhes da ONU": "show gpon onu detail-info gpon-olt_{slot}/{porta}/{pon}",
                    "MAC da ONU": "show gpon onu mac gpon-olt_{slot}/{porta}/{pon} {id}",
                    "Status PON": "show interface gpon-olt_{slot}/{porta}/{pon}",
                    "Config da PON": "show running-config interface gpon-olt_{slot}/{porta}/{pon}"
                },
                "Remover ONU": {
                    "Por ID": "configure terminal\ninterface gpon-olt_{slot}/{porta}/{pon}\nno onu {id}\nexit\nexit",
                    "Por Serial": "configure terminal\ninterface gpon-olt_{slot}/{porta}/{pon}\nno onu sn {sn}\nexit\nexit",
                    "Conversor para remoção em lote": "CONVERTER_ONU_TOOL"
                },
                "Reiniciar ONU": "configure terminal\ninterface gpon-olt_{slot}/{porta}/{pon}\nonu {id} reboot\nexit\nexit",
                "Atualizar ONU": {
                    "Verificar versão": "show cpe information gpon-olt_{slot}/{porta}/{pon} {id}",
                    "Atualizar firmware": "cpe update-and-reboot {firmware} gpon-olt_{slot}/{porta}/{pon} {id}",
                    "Status atualização": "show cpe update-status gpon-olt_{slot}/{porta}/{pon} {id}"
                }
            },
            "Diagnóstico": {
                "Informações Ópticas": {
                    "Níveis ópticos": "show gpon onu optical-info gpon-olt_{slot}/{porta}/{pon} {id}",
                    "Distância ONU": "show gpon onu distance gpon-olt_{slot}/{porta}/{pon} {id}",
                    "MACs aprendidos": "show gpon onu mac-learning gpon-olt_{slot}/{porta}/{pon} {id}"
                },
                "Alarmes": "show alarm active"
            }
        }
    },
    "Huawei MA5800 Araquari": {
        "description": "OLT HUAWEI ARAQUARI",
        "categories": {
            "Gerenciamento de ONU": {
                "Adicionar ONU": {
                    "_dica": "Na Huawei MA5800, o comando 'interface gpon' usa apenas frame/slot (ex: 0/2). A porta PON entra separada nos comandos seguintes. Os perfis lineprofile e srvprofile normalmente seguem o número da VLAN nessa OLT (ex: VLAN 613 = perfil 613). Confirme os perfis disponíveis antes.",
                    "🔍 Passo Inicial: Verificar perfis": "display ont-lineprofile gpon all",
                    "🔍 Passo Inicial: Verificar ONU nova": "display ont autofind all",
                    "🔍 Passo Inicial: Verificar IDs na PON": "display ont info summary {frame}/{slot}/{pon}",
                    "▶ OPÇÃO A: Adicionar ONU L2 (Huawei Nativa)": "enable\nconfig\ninterface gpon {frame}/{slot}\nont add {pon} {id} sn-auth {sn} omci ont-lineprofile-id {perfil} ont-srvprofile-id {perfil} desc {nome}\nont port native-vlan {pon} {id} eth 1 vlan {vlan} priority 0\nquit\nservice-port vlan {vlan} gpon {frame}/{slot}/{pon} ont {id} gemport 1 multi-service user-vlan {vlan} tag-transform translate\nsave",
                    "▶ OPÇÃO B: Adicionar ONT (Internet + Tel. VoIP)": "enable\nconfig\ninterface gpon {frame}/{slot}\nont add {pon} {id} sn-auth {sn} omci ont-lineprofile-id {perfil} ont-srvprofile-id {perfil} desc \"{nome}\"\nquit\nservice-port vlan {vlan} gpon {frame}/{slot}/{pon} ont {id} gemport 1 multi-service user-vlan {vlan} tag-transform translate\nservice-port vlan 4030 gpon {frame}/{slot}/{pon} ont {id} gemport 5 multi-service user-vlan 4030 tag-transform translate\nsave",
                    "▶ OPÇÃO C: Adicionar ONU L2 (Perfil FAST 10)": "enable\nconfig\ninterface gpon {frame}/{slot}\nont add {pon} {id} sn-auth {sn} omci ont-lineprofile-id 10 ont-srvprofile-id 10 desc \"{nome}\"\nquit\nservice-port vlan {vlan} gpon {frame}/{slot}/{pon} ont {id} gemport 1 multi-service user-vlan untagged tag-transform default\nsave",
                    "▶ OPÇÃO D: Adicionar ONU L2 (Terceiros / Zyxel)": "enable\nconfig\ninterface gpon {frame}/{slot}\nont add {pon} {id} sn-auth {sn} omci ont-lineprofile-id {perfil} ont-srvprofile-id {perfil} desc {nome}\nquit\nservice-port vlan {vlan} gpon {frame}/{slot}/{pon} ont {id} gemport 1 multi-service user-vlan {vlan} tag-transform translate\nsave",
                    "_aviso_perfil": "Se der erro 'The line profile does not exist', o perfil 48 não existe nessa OLT. Use o passo 1 para listar os perfis reais e substitua pelo número correto.",
                    "_aviso_id": "O {id} deve ser o próximo número livre na PON. Use o passo 3 para verificar. Se o IXC tentar usar o ID 0 e ele já estiver ocupado, a autorização vai falhar.",
                    "_aviso_ixc": "Após subir manualmente, atualize o campo 'ONU número' no IXC com o {id} usado antes de clicar em Autorizar ONU novamente.",
                    "5. Verificar se subiu": "display ont info by-sn {sn}"
                },
                "Consultar ONU": {
                    "Resumo PON": "display ont info summary",
                    "Por Serial Number": "display ont info by-sn {sn}",
                    "Informações detalhadas": "display ont info {slot} {porta} {pon} {id}",
                    "Versão firmware": "display ont version {slot} {porta} {pon} {id}"
                },
                "Remover ONU": {
                    "Verificar service-ports": "display service-port port {slot}/{porta}/{pon} ont {id}",
                    "Remover service-port": [
                        "config",
                        "undo service-port {index}"
                    ],
                    "Excluir ONU": [
                        "config",
                        "interface gpon {slot}/{porta}",
                        "ont delete {pon} {id}",
                        "quit",
                        "quit",
                        "save"
                    ]
                },
                "Reiniciar ONU": "ont reset {slot} {porta} {pon} {id}"
            },
            "Diagnóstico": {
                "Informações Ópticas": {
                    "Potência óptica ONU": "display ont info {slot} {porta} {pon} {id}"
                }
            },
            "Sistema": {
                "Informações Gerais": {
                    "Versão sistema": "display version",
                    "Lista interfaces": "display interface brief",
                    "Configuração atual": "display current-configuration"
                },
                "Navegação": {
                    "Modo privilegiado": "enable",
                    "Modo configuração": "config",
                    "Interface GPON": "interface gpon {slot} {porta}",
                    "Sair nível atual": "quit",
                    "Salvar configuração": "save"
                }
            }
        }
    },
    "Fiberhome AN5516": {
        "description": "OLT FIBERHOME AN5516 (Sistema VR3.2)",
        "categories": {
            "Gerenciamento de ONU": {
                "Consultar ONU": {
                    "ONUs Online": "cd gpononu\nshow online slot {slot} link {link}",
                    "Estado da ONU específica": "cd gpononu\nshow onu_state slot {slot} link {link} onu {onu}",
                    "ONUs não autorizadas": "cd gpononu\nshow unauth list",
                    "Por Serial Number (Physical ID)": "cd gpononu\nshow onu-authinfo phy-id {sn}",
                    "Por ID Lógico": "cd gpononu\nshow onu-authinfo log-id {logical_id}",
                    "Por Password Física": "cd gpononu\nshow onu-authinfo password {password}",
                    "Versão firmware": "cd gpononu\nshow onu_ver slot {slot} link {link}",
                    "Potência óptica": "cd gpononu\nshow opticpower_scout slot {slot} link {link} onu {onu}",
                    "Último log de conexão/desconexão": "cd gpononu\nshow onu_last_on_and_off_time slot {slot} link {link} onu {onu}"
                },
                "Remover ONU": {
                    "Desautorizar ONU": "enable\ncd gpononu\nset whitelist phy_addr address {sn} password null action delete\ncd\nsave"
                },
                "Atualizar ONU": {
                    "Verificar versão": "cd gpononu\nshow onu_ver slot {slot} link {link}",
                    "Atualizar firmware": "cd gpononu\nonu_upgrade slot {slot} link {link} onu {onu} file {firmware}",
                    "Status atualização": "cd gpononu\nshow onu_upgrade_status slot {slot} link {link} onu {onu}"
                },
                "Diagnóstico ONU": {
                    "Status portas Ethernet": "cd gpononu\nshow feport_status slot {slot} link {link} onu {onu}",
                    "MACs aprendidos": "cd gpononu\nshow mac_list slot {slot} link {link} onu {onu} port {port}",
                    "Informações ópticas": "cd gpononu\nshow opticpower_scout slot {slot} link {link} onu {onu}",
                    "Distância/RTT": "cd gpononu\nshow rtt_value slot {slot} link {link} onu {onu}"
                }
            },
            "Sistema": {
                "Navegação": {
                    "Modo Admin": "enable",
                    "Voltar ao menu anterior": " cd ..",
                    "Limpar tela": "clear",
                    "Listar comandos": "list",
                    "Ajuda": "help",
                    "Sair": "quit",
                    "Salvar configurações": "save"
                }
            }
        }
    }
};

window.VALIDATION_PATTERNS = {
    "slot": "^\\d{1,2}$",
    "porta": "^\\d{1,2}$",
    "pon": "^\\d{1,2}$",
    "id": "^\\d{1,3}$",
    "onu": "^\\d{1,3}$",
    "link": "^\\d{1,2}$",
    "sn": "^[A-Za-z0-9]{8,16}$",
    "mac": "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$",
    "logical_id": "^\\d+$",
    "tipo": "^[A-Za-z0-9-]+$",
    "profile": "^[A-Za-z0-9_ -]+$",
    "perfil": "^\\d+$",
    "vlan": "^\\d{1,4}$",
    "frame": "^\\d{1,2}$",
    "nome": "^[A-Za-z0-9_ -]+$",
    "pppoe_login": "^[\\\\w\\\\.-]+$",
    "pppoe_senha": "^.+$"
};

window.DOCUMENTATION = {
    "slot": "Número do slot da OLT (1-16)",
    "porta": "Número da porta GPON (1-16)",
    "pon": "Número da PON (1-8)",
    "id": "ID da ONU (1-128)",
    "onu": "ID da ONU (1-128)",
    "link": "Número do Link/Porta (Fiberhome)",
    "sn": "Número de série da ONU (8-16 caracteres)",
    "mac": "Endereço MAC formato XX:XX:XX:XX:XX:XX",
    "firmware": "Nome do arquivo de firmware",
    "index": "Index do Service Port",
    "logical_id": "ID Lógico da ONU",
    "password": "Senha física (Password Auth)",
    "port": "Porta Ethernet da ONU",
    "tipo": "Modelo/Tipo da ONU (ex: ZTE-F660)",
    "profile": "Nome ou ID do Profile (ex: INTERNET)",
    "perfil": "ID do Line/Service Profile (Huawei)",
    "vlan": "ID da VLAN (1-4094)",
    "frame": "Número do Chassi/Frame (geralmente 0 na Huawei)",
    "nome": "Descrição/Nome do cliente",
    "pppoe_login": "Login do cliente no PPPoE (ex: joaosilva)",
    "pppoe_senha": "Senha do PPPoE"
};

window.OLT_TIPS = {
    "Huawei MA5800 Araquari": [
        "Execute 'enable' para modo privilegiado",
        "Use 'config' para modo de configuração",
        "Use 'save' para salvar alterações"
    ],
    "ZTE Z600 Itaum": [
        "Execute 'enable' antes de configurar",
        "'configure terminal' entra no modo config",
        "Cuidado com comandos de interface"
    ],
    "ZTE C300 Ullyses": [
        "'enable' para modo privilegiado",
        "'config' para configurações globais",
        "Lembre-se de salvar com 'save'"
    ],
    "Fiberhome AN5516": [
        "'enable' para modo admin",
        "Use 'cd' para navegar entre módulos (ex: cd gpononu)",
        "Comandos de Fiberhome são sensíveis ao contexto (módulo atual)"
    ]
};

window.OLT_OPTIONS = {
    "Huawei MA5800 Araquari": {
        "perfil": [
            { "value": "10", "label": "10 - fasttLINE" },
            { "value": "3000", "label": "3000 - line-profile_3000" },
            { "value": "3004", "label": "3004 - line-profile_3004" },
            { "value": "612", "label": "612 - line-profile_612" },
            { "value": "608", "label": "608 - line-profile_608" },
            { "value": "614", "label": "614 - line-profile_614" },
            { "value": "3032", "label": "3032 - line-profile_3032" },
            { "value": "3035", "label": "3035 - line-profile_3035" },
            { "value": "616", "label": "616 - line-profile_616" },
            { "value": "601", "label": "601 - line-profile_601" },
            { "value": "613", "label": "613 - line-profile_613" },
            { "value": "3006", "label": "3006 - line-profile_3006" },
            { "value": "3034", "label": "3034 - line-profile_3034" },
            { "value": "3005", "label": "3005 - line-profile_3005" },
            { "value": "609", "label": "609 - line-profile_609" },
            { "value": "610", "label": "610 - line-profile_610" },
            { "value": "3003", "label": "3003 - line-profile_3003" },
            { "value": "611", "label": "611 - line-profile_611" },
            { "value": "615", "label": "615 - line-profile_615" },
            { "value": "3011", "label": "3011 - line-profile_3011" },
            { "value": "3013", "label": "3013 - line-profile_3013" },
            { "value": "3001", "label": "3001 - line-profile_3001" },
            { "value": "3012", "label": "3012 - line-profile_3012" },
            { "value": "602", "label": "602 - line-profile_602" },
            { "value": "606", "label": "606 - line-profile_606" },
            { "value": "3014", "label": "3014 - line-profile_3014" },
            { "value": "3008", "label": "3008 - line-profile_3008" },
            { "value": "3015", "label": "3015 - line-profile_3015" },
            { "value": "603", "label": "603 - line-profile_603" },
            { "value": "605", "label": "605 - line-profile_605" },
            { "value": "3007", "label": "3007 - line-profile_3007" },
            { "value": "3044", "label": "3044 - line-profile_3044" },
            { "value": "3043", "label": "3043 - line-profile_3043" },
            { "value": "604", "label": "604 - line-profile_604" },
            { "value": "3046", "label": "3046 - line-profile_3046" },
            { "value": "3037", "label": "3037 - line-profile_3037" },
            { "value": "3038", "label": "3038 - line-profile_3038" },
            { "value": "3009", "label": "3009 - line-profile_3009" },
            { "value": "3045", "label": "3045 - line-profile_3045" },
            { "value": "3040", "label": "3040 - line-profile_3040" },
            { "value": "3041", "label": "3041 - line-profile_3041" }
        ]
    },
    "ZTE Z600 Itaum": {
        "tipo": [
            { "value": "F601", "label": "F601 (1GE_BRIDGE)" },
            { "value": "F660", "label": "F660 (4GE,2POTS,4WIFI)" },
            { "value": "F670", "label": "F670 (4GE,2FXS,4WiFi2.4,4WiFi5)" },
            { "value": "F670L", "label": "F670L (4GE,1FXS,4WiFi2.4,4WiFi5)" },
            { "value": "ZTE-F601", "label": "ZTE-F601 (1ETH)" },
            { "value": "ZTE-F621", "label": "ZTE-F621 (6ETH, 4E1)" },
            { "value": "ZTE-F622", "label": "ZTE-F622 (4ETH, 2POTS)" },
            { "value": "ZTE-F625", "label": "ZTE-F625 (4ETH, 2POTS, 1RF)" },
            { "value": "ZTE-F628", "label": "ZTE-F628 (6ETH, 2POTS, 1RF, 1WiFi)" },
            { "value": "ZTE-F640", "label": "ZTE-F640 (1ETH, 2POTS, 1RF)" },
            { "value": "ZTE-F641", "label": "ZTE-F641 (4ETH)" },
            { "value": "PROFILE-DEFAULT", "label": "PROFILE-DEFAULT (32ETH, 2POTS, 1RF, 4WiFi)" }
        ],
        "profile": [
            { "value": "INTERNET", "label": "INTERNET" }
        ]
    },
    "ZTE C300 Ullyses": {
        "tipo": [
            { "value": "HT803G-V", "label": "HT803G-V (2GE,1POTS)" },
            { "value": "ZTE-F601", "label": "ZTE-F601 (1ETH)" },
            { "value": "ZTE-F621", "label": "ZTE-F621 (6ETH, 4E1)" },
            { "value": "ZTE-F622", "label": "ZTE-F622 (4ETH, 2POTS)" },
            { "value": "ZTE-F625", "label": "ZTE-F625 (4ETH, 2POTS, 1RF)" },
            { "value": "ZTE-F628", "label": "ZTE-F628 (6ETH, 2POTS, 1RF, 1WiFi)" },
            { "value": "ZTE-F640", "label": "ZTE-F640 (1ETH, 2POTS, 1RF)" },
            { "value": "ZTE-F641", "label": "ZTE-F641 (4ETH)" },
            { "value": "ZTE-F660", "label": "ZTE-F660 (4GE,2POTS,4WIFI)" },
            { "value": "ZTE-F668", "label": "ZTE-F668" }
        ],
        "profile": [
            { "value": "INTERNET", "label": "INTERNET" },
            { "value": "VOZ", "label": "VOZ" }
        ]
    }
};
