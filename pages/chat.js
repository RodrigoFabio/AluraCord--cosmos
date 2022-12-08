import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import {createClient} from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import {ButtonSendSticker} from '../src/components/ButtonSendStickers';

const SUPABASE_ANON_KEY= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6eGh6cHFhbWF5YWF3dmthaHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDU0OTMsImV4cCI6MTk4MTU4MTQ5M30.wF41GSqNY3ASKN8M3ncJLB3t9pcQ3b1TbnyQWhNaFNY';
const SUPABASE_URL = 'https://czxhzpqamayaawvkahvg.supabase.co';
const supabaseCliente = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  function escutaMensagensEmTempoReal(adicionaMensagem) {
    return (
        supabaseCliente.from('mensagens').on('INSERT', (respostaLive) => {
        adicionaMensagem(respostaLive.new);
      })
      .subscribe());
  }

export default function ChatPage() {
    // Sua lógica vai aqui
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState("");
    const [listaMensagem, setListaMensagem] = React.useState([
    
    ]);

      React.useEffect(()=>{
        supabaseCliente
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
            //console.log('Dados da consulta:', data);
                setListaMensagem(data);
            });

            const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
                console.log('Nova mensagem:', novaMensagem);
                console.log('listaDeMensagens:', listaMensagem);
                // Quero reusar um valor de referencia (objeto/array) 
                // Passar uma função pro setState
          
                // setListaDeMensagens([
                //     novaMensagem,
                //     ...listaDeMensagens
                // ])
                setListaMensagem((valorAtualDaLista) => {
                  return [
                    novaMensagem,
                    ...valorAtualDaLista,
                  ]
                });
              });
              return () => {
                subscription.unsubscribe();
              }
            }, []);
      


      function handleNovaMensagem(novaMensagem) {

        const mensagem = {
          //id: listaMensagem.length + 1,
          de: usuarioLogado,
          texto: novaMensagem,
        };
        
       {/* setListaMensagem([
            mensagem,
            ...listaMensagem,
          ]);
          setMensagem(''); */}  
        supabaseCliente
          .from('mensagens')
          .insert([
            // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
            mensagem
          ])
          .select('*')
         .then(({data}) => {
            console.log('Criando mensagem: ', data);
            
          });
        
    
        setMensagem('');
      }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://image.winudf.com/v2/image/Y29tLmFuZHJvbW8uZGV2NDg2Mjc2LmFwcDQ0NDY4N19zY3JlZW5zaG90c18wX2Y5ZWRkZTdh/screen-0.jpg?fakeurl=1&type=.webp)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(41,51,61,80%)',
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                     <MessageList mensagens={listaMensagem} /> 
                   {/* {listaMensagem.map((mensagemAtual)=>{
                        return(
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                     })}*/}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={function(evento){
                              
                                const valor = evento.target.value;
                           
                                    setMensagem(valor)
                            }}
                            onKeyPress={function(evento){
                                
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker 
                            onStickerClick={(sticker)=>{
                                console.log("SALVA ESSE STICKER NO BANCO",sticker);
                                handleNovaMensagem(`:sticker:${sticker}`);
                        }}/>

                        <Button  label="Enviar" onClick={function(evento){
                            handleNovaMensagem(mensagem);
                            {/*console.log('clicou');
                            setListaMensagem([
                                mensagem, ...listaMensagem 
                            ]);
                            setListaMensagem('');
                        <MessageList mensagens={listaMensagem}/>*/}
                        }}
                        styleSheet={{width:'10%', height:'30px', fontSize:'10px', backgroundColor:"#5865F2",hover:'#29333D'}}/>
                        

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem)=>{
            return(
                <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px', display:'flex'
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${mensagem.de}.png`}
                    />
                    <Text tag="strong">
                        {mensagem.de}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                            marginTop:'5px'
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                </Box>
                {mensagem.texto.startsWith(':sticker:')
                    ? (
                        <Image src={mensagem.texto.replace(':sticker:','')} styleSheet={{maxWidth:'25%'}}/>
                    ) :
                    (
                        mensagem.texto
                    )}
           {/*{mensagem.texto} */} 
            </Text>
            );

            })}
            
        </Box>
    )
}