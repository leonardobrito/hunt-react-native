import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import api from "../services/api";

export default class Main extends Component {
  static navigationOptions = {
    title: "JS Hunt"
  };

  state = {
    productInfo: {},
    docs: [],
    page: 1
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);
    const { docs, ...productInfo } = response.data;
    this.setState({
      docs: [...this.state.docs, ...docs],
      productInfo,
      page
    });
  };

  loadMore = () => {
    const { page, productInfo } = this.state;
    if (page === productInfo.pages) return;
    const pageNumber = page + 1;
    this.loadProducts(pageNumber);
  };

  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          this.props.navigation.navigate("Product", { product: item });
        }}
      >
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View styles={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={item => item._id}
          data={this.state.docs}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  list: {
    padding: 20
  },
  productContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  productDescription: {
    fontSize: 18,
    color: "#999",
    marginTop: 5,
    lineHeight: 24
  },
  productButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#da552f",
    backgroundColor: "transparent",
    marginTop: 10
  },
  productButtonText: {
    fontSize: 16,
    color: "#da552f",
    fontWeight: "bold"
  }
});
