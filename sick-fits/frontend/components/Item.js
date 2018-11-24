import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import formatMoney from '../lib/formatMoney'

class Item extends Component {
    static PropTypes = {
      item: PropTypes.object.isRequired,
    };


    render() {
        const { item } = this.props;

        return (
            <ItemStyles>
                {/* Images */}
                {item.image && <img src={item.image} alt={item.title} />}

                {item.image ? <img /> : null}

                {/* Title */}
                <Title>
                    <Link href={{
                        pathname: '/item',
                        query: { id: query.id }
                    }}>
                        <a>{item.title}</a>
                    </Link>
                </Title>
                {/* PriceTag */}
                <PriceTag>
                    {formatMoney(item.price)}
                </PriceTag>
                {/* Description */}
                <p>{item.description}</p>
                {/* Buttons */}
                <div className="buttonList">
                    <Link href={{
                        pathname: "update",
                        query: {id: item.id}
                    }}>
                        <a>Edit</a>
                    </Link>
                    <button>Add to card</button>
                    <button>Delete</button>
                </div>
            </ItemStyles>
        )
    }
}

export default Item
