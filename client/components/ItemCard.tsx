import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { IItem } from '../../shared/interfaces/Item';

const ItemCard: React.FC<IItem> = ({
  name,
  price,
  seller,
  category,
  image,
  description,
  quantity,
}) => {
  function getQuantity(quantity: number) {
    if (quantity <= 0) return <div style={{ color: 'red' }}>Out of Stock</div>;
    else if (quantity > 0 && quantity < 50)
      return <div style={{ color: 'blue' }}>Only {quantity} left</div>;
    else return <div style={{ color: 'green' }}>In Stock</div>;
  }

  return (
    <>
      <Card
        style={{
          width: '24rem',
          height: '40rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Card.Img
              style={{ width: 'auto', height: '24rem', margin: 'auto' }}
              variant="top"
              src={image}
            />
          </div>
          <Card.Body>
            <Card.Title>
              {name} - ${price} -{' '}
              <div style={{ color: 'red' }}>{getQuantity(quantity)}</div>
            </Card.Title>
            <Card.Text>
              {seller} - {category} - {description}
            </Card.Text>
            <Button variant="primary">View</Button>
          </Card.Body>
        </div>
      </Card>
    </>
  );
};

export default ItemCard;
