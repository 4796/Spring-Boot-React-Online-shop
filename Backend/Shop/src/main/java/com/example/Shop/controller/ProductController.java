package com.example.Shop.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.Shop.model.Product;
import com.example.Shop.model.Worker;
import com.example.Shop.service.AuthService;
import com.example.Shop.service.ProductService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {
	
	@Autowired
	private ProductService service;
	
	
	@Autowired
	AuthService authService;
	
	
	
	@GetMapping("/")
	public String cao() {
		return "CAO";
	}
	
	
	//for anyone is allright
	@GetMapping("/products") 
	public ResponseEntity<List<Product>> getAllProducts(){
		List<Product> l=service.getAllProducts();
		if(l==null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		else
			return  new ResponseEntity<>(l, HttpStatus.OK);
	}
	
	//for anyone is alright
	@GetMapping("/products/{id}") 
	public ResponseEntity<Product> getProduct(@PathVariable int id){
		Product p=service.getProduct(id);
		if (p==null)
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		else
			return  new ResponseEntity<>(p, HttpStatus.OK);
	}
	
	//worker
	@PostMapping("/products") 
	public ResponseEntity<?> addProduct(@RequestBody Map<String, Object> mapa,  @RequestHeader("Authorization") String token){
		Product product=null;
		Worker w =null; 
		try {
			w=(Worker) mapa.get("worker");
			String username = authService.validateTokenAndGetUser(token); 
	        if (username == null || !username.equals(w.getUsername())) {
	        	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	        }
			product= (Product) mapa.get("product");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		
		Product p=service.addProduct(product);
		if(p==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else
			return  new ResponseEntity<>(p, HttpStatus.CREATED);
	}
	
	//worker
	@PutMapping("/products/{id}") 
	public ResponseEntity<?> updateProduct(@PathVariable int id, @RequestBody Map<String, Object> mapa,  @RequestHeader("Authorization") String token){
		Product product=null;
		Worker w=null; 
		try {
			w=(Worker) mapa.get("worker");
			String username = authService.validateTokenAndGetUser(token); 
	        if (username == null || !username.equals(w.getUsername())) {
	        	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	        }
			product= (Product) mapa.get("product");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		
		product.setId(id);
		Product p=service.updateProduct(product);
		if(p==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else
			return  new ResponseEntity<>(p, HttpStatus.OK);
	}

	//worker
	@DeleteMapping("/products/{id}") 
	public ResponseEntity<?> deleteProduct(@PathVariable int id, Worker w, @RequestHeader("Authorization") String token){
		try {
			String username = authService.validateTokenAndGetUser(token); 
	        if (username == null || !username.equals(w.getUsername())) {
	        	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	        }
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
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
