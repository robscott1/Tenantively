import React, { useState } from "react";
import { Button, List, Card, message } from "antd";

import "antd/dist/antd.css";

function RelevantReferences() {
  //   const [data, setData] = useState([
  //     {
  //       webPage: {
  //         url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
  //       },
  //       previewText:
  //         "Ethereum is a **decentralized Web 3.0 platform** for the creation and peer-to-peer publication of smart contracts created in a Turing-complete programming language."
  //     },
  //     {
  //       webPage: { url: "https://openai.com/blog/musenet/" },
  //       previewText:
  //         "MuseNet uses the same general-purpose unsupervised technology as **GPT-2**, a large-scale **transformer model** trained to predict the next token in a **sequence**, whether audio or text."
  //     }
  //   ]);

  const data = [
    {
      title: "Aurora",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
    },
    {
      title: "IG",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
    },
    {
      title: "Lol",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
    },
    {
      title: "Hi",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
    }
  ];

  //   const handleCite = item => {
  //     message.info("Write the DocumentEditor Jay");
  //   };

  //   const handleCloseReference = item => {
  //     console.log(item);
  //     setData(data.filter(entry => entry.webPage.url !== item.webPage.url));
  //   };

  const { Meta } = Card;

  return (
    <div className="RelevantReferences">
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta />
            {/* <Card
                            hoverable
                            actions={[
                                <Button
                                    type='default'
                                    size='small'
                                    shape='round'
                                    onClick={() => handleCite(item)}
                                >
                                        Cite
                                        <Icon type="plus-circle" />
                                </Button>,
                            ]}
                            extra={
                                <Button
                                    type='default'
                                    size='small'
                                    shape='circle'
                                    onClick={() => handleCloseReference(item)}
                                >
                                        <Icon type="close" />
                                </Button>
                            }
                            title={<a href={item.webPage.url}>{item.webPage.url}</a>}
                            size="small"
                            style={{ width: 300}}
                        >
                            {<Markdown>{item.previewText}</Markdown>}
                        </Card> */}
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={item.img} />}
            >
              <Meta title={item.title} description="www.instagram.com" />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default RelevantReferences;
