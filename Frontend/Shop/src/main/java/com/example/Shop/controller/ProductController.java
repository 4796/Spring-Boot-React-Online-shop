package com.example.Shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.example.Shop.model.Product;
import com.example.Shop.service.ProductService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {
	
	@Autowired
	private ProductService service;
	
	@GetMapping("/")
	public String cao() {
		return "CAO";
	}
	
	@GetMapping("/products") 
	public ResponseEntity<List<Product>> getAllProducts(){
		List<Product> l=service.getAllProducts();
		if(l==null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		else
			return  new ResponseEntity<>(l, HttpStatus.OK);
	}
	
	@GetMapping("/products/{id}") 
	public ResponseEntity<Product> getProduct(@PathVariable int id){
		Product p=service.getProduct(id);
		if (p==null)
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		else
			return  new ResponseEntity<>(p, HttpStatus.OK);
	}
	
	@PostMapping("/products") 
	public ResponseEntity<?> addProduct(@RequestBody Product product){
		Product p=service.addProduct(product);
		if(p==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else
			return  new ResponseEntity<>(p, HttpStatus.CREATED);
	}
	
	
	@PutMapping("/products/{id}") 
	public ResponseEntity<?> updateProduct(@PathVariable int id, @RequestBody Product product){
		product.setId(id);
		Product p=service.updateProduct(product);
		if(p==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else
			return  new ResponseEntity<>(p, HttpStatus.OK);
	}

	
	@DeleteMapping("/products/{id}") 
	public ResponseEntity<?> deleteProduct(@PathVariable int id){
		Product p=service.getProduct(id);
		if(p==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else {
			service.deleteProduct(id);
			return  new ResponseEntity<>(HttpStatus.OK);
			}	
	}
	
	@GetMapping("/products/search")  //http://localhost:8080/api/products/search?keyword=ef
	public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword){
		List<Product> l=service.searchProducts(keyword);
		if(l==null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		else
			return  new ResponseEntity<>(l, HttpStatus.OK);
		
	}
}
