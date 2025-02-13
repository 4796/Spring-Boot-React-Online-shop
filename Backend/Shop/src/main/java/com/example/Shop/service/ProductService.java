package com.example.Shop.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Shop.db.ProductRepo;
import com.example.Shop.model.Product;

import jakarta.transaction.Transactional;

@Service
public class ProductService {

	@Autowired
	private ProductRepo repo;
	
	public List<Product> getAllProducts() {
		return repo.findAll();
	}

	public Product getProduct(int id) {

		return repo.findById(id).orElse(null);
	}

	@Transactional
	public Product addProduct(Product product) {
		product.setDate(LocalDate.now());
		if(product.getQuantity()<1)
			product.setAveilable(false);
		return repo.save(product);
	}

	@Transactional
	public Product updateProduct(Product product) throws Exception {
		if(product.getQuantity()<0)
			throw new Exception("Invalid value for quantity");
		if(product.getQuantity()<1)
			product.setAveilable(false);
		else
			product.setAveilable(true);
		return repo.save(product);
	}

	@Transactional
	public void deleteProduct(int id) {
		repo.deleteById(id);
		
		
	}

	public List<Product> searchProducts(String keyword) {
		return repo.searchProducts(keyword);
	}

}
