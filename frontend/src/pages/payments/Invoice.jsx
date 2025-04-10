import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderTopWidth: 1,
    borderTopColor: '#000',
    fontWeight: 'bold',
    paddingVertical: 4,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    paddingRight: 5,
  },
  totalRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 4,
    marginTop: 4,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 10,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
  }
});

const Invoice = ({ transaction }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Tax Invoice</Text>

      {/* Order Info */}
      <View style={styles.section}>
        <Text><Text style={styles.bold}>Order ID:</Text> {transaction.id}</Text>
        <Text><Text style={styles.bold}>Order Date:</Text> {new Date(transaction.date).toLocaleDateString()}</Text>
        <Text><Text style={styles.bold}>Invoice Date:</Text> {new Date(transaction.date).toLocaleDateString()}</Text>
        <Text><Text style={styles.bold}>Payment Mode:</Text> {transaction.paymentMode}</Text>
      </View>

      {/* Billing & Shipping */}
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.bold}>Bill To:</Text>
            <Text>{transaction.shippingAddress.name}</Text>
            <Text>{transaction.shippingAddress.street}</Text>
            <Text>{transaction.shippingAddress.city}, {transaction.shippingAddress.state} - {transaction.shippingAddress.zip}</Text>
            <Text>{transaction.shippingAddress.country}</Text>
            <Text>Phone: {transaction.shippingAddress.phone}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.bold}>Ship To:</Text>
            <Text>{transaction.shippingAddress.name}</Text>
            <Text>{transaction.shippingAddress.street}</Text>
            <Text>{transaction.shippingAddress.city}, {transaction.shippingAddress.state} - {transaction.shippingAddress.zip}</Text>
            <Text>{transaction.shippingAddress.country}</Text>
            <Text>Phone: {transaction.shippingAddress.phone}</Text>
          </View>
        </View>
      </View>

      {/* Product Details */}
      <View style={styles.section}>
        <Text style={styles.bold}>Product Details:</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.cell}>Product</Text>
          <Text style={styles.cell}>Qty</Text>
          <Text style={styles.cell}>Price ₹</Text>
          <Text style={styles.cell}>Total ₹</Text>
        </View>

        {transaction.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.quantity}</Text>
            <Text style={styles.cell}>₹{item.price}</Text>
            <Text style={styles.cell}>₹{(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.cell}>Grand Total</Text>
          <Text style={styles.cell}></Text>
          <Text style={styles.cell}></Text>
          <Text style={styles.cell}>₹{transaction.amount}</Text>
        </View>
      </View>

      <Text style={styles.footer}>Thank you for shopping with us!</Text>
    </Page>
  </Document>
);

export default Invoice;
