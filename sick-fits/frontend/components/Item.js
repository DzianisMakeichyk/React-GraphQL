import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';

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
                        query: { id: item.id },
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
                    {/* Edit */}
                    <Link href={{
                        pathname: "update",
                        query: {id: item.id}
                    }}>
                        <a>Edit</a>
                    </Link>
                    {/* Add to card */}
                    <button>Add to card</button>
                    {/* Delete */}
                    <DeleteItem id={item.id}>
                        Delete this item
                    </DeleteItem>
                </div>
            </ItemStyles>
        )
    }
}

export default Item
