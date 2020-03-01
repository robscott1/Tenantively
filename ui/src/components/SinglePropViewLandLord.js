import { Card } from 'antd';
import React from 'react';

const { Meta } = Card;

function SingleView() {
    return (
        <Card
            hoverable
            style={{width: 240}}
            cover={<img alt="home" src="https://www.homeone.com.au/p/y/Your-Abode-4481/photos/collaroy_new_house_external_view_2.jpg"/>}
        >
            <Meta title="2 Address Way, San Luis Obispo, CA" description="$2000/Month"/>
        </Card>

    );
}

export default SingleView;