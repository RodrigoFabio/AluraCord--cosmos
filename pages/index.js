import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

var sinalizador =0;
function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>
        {`
          ${Tag} {
            color: ${appConfig.theme.colors.neutrals["000"]};
          }
        `}
      </style>
    </>
  );
}
//function HomePage() {
//   return <>
//           <div>
//               <Titulo tag="h2">Boas Vindas de volta !</Titulo>
//               <h2>Discord - Alura cosmos</h2>
//            </div>
//    </>
//  }
// export default HomePage

export default function PaginaInicial() {
  //const username = 'omariosouto';
  const [username, setUsername] = React.useState("");
  const roteamento = useRouter();

  return (
    <>
      <Box //fundo geral com a imagem do cosmos
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            "url(https://image.winudf.com/v2/image/Y29tLmFuZHJvbW8uZGV2NDg2Mjc2LmFwcDQ0NDY4N19zY3JlZW5zaG90c18wX2Y5ZWRkZTdh/screen-0.jpg?fakeurl=1&type=.webp)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box  //caixa onde estarão a foto, nome 
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: 'rgba(41,51,61,80%)',
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            
            onSubmit={function (infosDoEvento) {
                infosDoEvento.preventDefault();
                console.log("Alguém submeteu o form");
                  {username && (
                    roteamento.push(`/chat?username=${username}`)
                  )}
             
              // window.location.href = '/chat';
            }}
            
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            {/*} <input
                              type="text"
                              value={username}
                              onChange={function (event) {
                                  console.log('usuario digitou', event.target.value);
                                  // Onde ta o valor?
                                  const valor = event.target.value;
                                  // Trocar o valor da variavel
                                  // através do React e avise quem precisa
                                  setUsername(valor);
                              }} 
                              style={{width:'320px', height:'40px', marginBottom:'5px'}}
                          /> */}
            <TextField
              value={username}
              onChange={function (event) {
                console.log("usuario digitou", event.target.value);
                // Onde ta o valor?
                const valor = event.target.value;
                const teste = event.nativeEvent.stopImmediatePropagation;
                // Trocar o valor da variavel
                // através do React e avise quem precisa
                setUsername(valor);
                sinalizador = 1;
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
              <Button
                type="submit"
                label="Entrar"
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[600],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
