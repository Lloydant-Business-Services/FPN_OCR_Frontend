import React from "react";
//import { render } from "react-dom";


import { Col, Divider, Row, Table } from 'antd';
//import '../../assets/css/invoice.css';

const Invoice = () => {
require('../../assets/css/invoice.css');

  return (
    <div className="container">
    <table width="100%">
      <tbody><tr>
          <td width="75px"><div className="logotype">Copmany</div></td>
          <td width="300px"><div style={{background: '#ffd9e8', borderLeft: '15px solid #fff', paddingLeft: '30px', fontSize: '26px', fontWeight: 'bold', letterSpacing: '-1px', height: '73px', lineHeight: '75px'}}>Order invoice</div></td>
          <td />
        </tr>
      </tbody></table> 
    <br /><br />
    <h3>Your contact details</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p><br />
    <table width="100%" style={{borderCollapse: 'collapse'}}>
      <tbody><tr>
          <td widdth="50%" style={{background: '#eee', padding: '20px'}}>
            <strong>Date:</strong> 2021/05/26<br />
            <strong>Payment type:</strong> Credit Card VISA<br />
            <strong>Delivery type:</strong> Postnord<br />
          </td>
          <td style={{background: '#eee', padding: '20px'}}>
            <strong>Order-nr:</strong> 27100<br />
            <strong>E-mail:</strong> firstname@company.com<br />
            <strong>Phone:</strong> 004676234567<br />
          </td>
        </tr>
      </tbody></table><br />
    <table width="100%">
      <tbody><tr>
          <td>
            <table>
              <tbody><tr>
                  <td style={{verticalAlign: 'text-top'}}>
                    <div style={{background: '#ffd9e8 url(https://cdn0.iconfinder.com/data/icons/commerce-line-1/512/comerce_delivery_shop_business-07-128.png)', width: '50px', height: '50px', marginRight: '10px', backgroundPosition: 'center', backgroundSize: '42px'}} />   
                  </td>
                  <td>
                    <strong>Delivery</strong><br />
                    Firstname Lastname<br />
                    Queens high 17 B<br />
                    SE-254 57 Helsingborg<br />
                    Sweden
                  </td>
                </tr>
              </tbody></table>
          </td>
          <td>
            <table>
              <tbody><tr>
                  <td style={{verticalAlign: 'text-top'}}>
                    <div style={{background: '#ffd9e8 url(https://cdn4.iconfinder.com/data/icons/app-custom-ui-1/48/Check_circle-128.png) no-repeat', width: '50px', height: '50px', marginRight: '10px', backgroundPosition: 'center', backgroundSize: '25px'}} />   
                  </td>
                  <td>
                    <strong>Delivery</strong><br />
                    Firstname Lastname<br />
                    Queens high 17 B<br />
                    SE-254 57 Helsingborg<br />
                    Sweden
                  </td>
                </tr>
              </tbody></table>
          </td>
        </tr>
      </tbody></table><br />
    <table width="100%" style={{borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '0 0 8px 0'}}>
      <tbody><tr>
          <td><h3>Checkout details</h3>Your checkout made by VISA Card **** **** **** 2478</td><td>
          </td></tr>
      </tbody></table><br />
    <div style={{background: '#ffd9e8 url(https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/shopping-cart-shop-drop-trolly-128.png) no-repeat', width: '50px', height: '50px', marginRight: '10px', backgroundPosition: 'center', backgroundSize: '25px', float: 'left', marginBottom: '15px'}} /> 
    <h3>Your articles</h3>
    <table width="100%" style={{borderCollapse: 'collapse', borderBottom: '1px solid #eee'}}>
      <tbody><tr>
          <td width="40%" className="column-header">Article</td>
          <td width="20%" className="column-header">Options</td>
          <td width="20%" className="column-header">Price</td>
          <td width="20%" className="column-header">Total</td>
        </tr>
        <tr>
          <td className="row"><span style={{color: '#777', fontSize: '11px'}}>#64000L</span><br />Softstyle Lady Fit</td>
          <td className="row">Black | Large</td>
          <td className="row">4 <span style={{color: '#777'}}>X</span> 25 SEK</td>
          <td className="row">100 SEK</td>
        </tr>
        <tr>
          <td className="row"><span style={{color: '#777', fontSize: '11px'}}>#64000L</span><br />Softstyle Lady Fit</td>
          <td className="row">Black | Large</td>
          <td className="row">4 <span style={{color: '#777'}}>X</span> 25 SEK</td>
          <td className="row">100 SEK</td>
        </tr>     
        <tr>
          <td className="row"><span style={{color: '#777', fontSize: '11px'}}>#64000L</span><br />Softstyle Lady Fit</td>
          <td className="row">Black | Large</td>
          <td className="row">4 <span style={{color: '#777'}}>X</span> 25 SEK</td>
          <td className="row">100 SEK</td>
        </tr>
      </tbody></table><br />
    <table width="100%" style={{background: '#eee', padding: '20px'}}>
      <tbody><tr>
          <td>
            <table width="300px" style={{float: 'right'}}>
              <tbody><tr>
                  <td><strong>Sub-total:</strong></td>
                  <td style={{textAlign: 'right'}}>100 SEK</td>
                </tr>  
                <tr>
                  <td><strong>Shipping fee:</strong></td>    
                  <td style={{textAlign: 'right'}}>50 SEK</td>
                </tr>
                <tr>
                  <td><strong>Tax 25%:</strong></td>    
                  <td style={{textAlign: 'right'}}>31.25 SEK</td>
                </tr>
                <tr>
                  <td><strong>Grand total:</strong></td>    
                  <td style={{textAlign: 'right'}}>187.50 SEK</td>
                </tr>
              </tbody></table>
          </td>
        </tr>
      </tbody></table>
    <div className="alert">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	</div>
    <div className="socialmedia">Follow us online <small>[FB] [INSTA]</small></div>
  </div>
  );
};


export default Invoice;
//render(<App />, document.getElementById("root"));
