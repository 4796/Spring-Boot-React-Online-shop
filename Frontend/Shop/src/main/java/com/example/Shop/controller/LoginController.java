package com.example.Shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Shop.model.Client;
import com.example.Shop.model.Order;
import com.example.Shop.model.Product;
import com.example.Shop.model.User;
import com.example.Shop.model.Worker;
import com.example.Shop.service.ProductService;
import com.example.Shop.service.UserService;

@RestController
public class LoginController {
	
//	@Autowired
//	ProductService productService;
	
	@Autowired
	UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody User user){
		User u=userService.logIn(user);
		if(u==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else
			return  new ResponseEntity<>(u, HttpStatus.OK);
	}
	
	@PostMapping("/register")
	public ResponseEntity<User> login(@RequestBody Client client){
		Client c=userService.register(client);
		if(c==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else
			return  new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/products/{id}/addtocart") 
	public ResponseEntity<?> addToCart(@PathVariable int id, @RequestBody Client client){
		Client c=userService.addToCart(id, client);
		if(c==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else
			return  new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/api/products/{id}")
	public ResponseEntity<Order> buy(@RequestBody Order order) {
		Order o=userService.buy(order);
		if(o==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else
			return  new ResponseEntity<>(HttpStatus.OK);
		
	}
	//za postmana za test ove fje http://localhost:8080/api/products/2
	/* 
	 * {
    "client": {
    "username": "aa",
    "password": "aaa"
},
    "product": {
    "id": 3,
    "name": "dfs",
    "price": 333.0,
    "description": "sfs",
    "brand": "c",
    "category": "sss",
    "date": "2025-02-03",
    "aveilable": true,
    "quantity": 5,
    "image": "dsf"
},
    "adress": "my street 1"
    
}
	 * 
	 * 
	 * */ 
	
	@PostMapping("/worker/add")
	public ResponseEntity<Worker> newWorker(@RequestBody Worker worker){
		Worker w=userService.addWorker(worker);
		if(w==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else {
			if(w.getUsername().equals("0")) //already exists, not created
				return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			if(w.getUsername().equals("-1")) //already exists, not created
				return  new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
			else
				return  new ResponseEntity<>(HttpStatus.CREATED);//success
		}
			
	}
	
	
	@PutMapping("/worker/update")
	public ResponseEntity<Worker> updateWorker(@RequestBody Worker worker){
		Worker w=userService.updateWorker(worker);
		if(w==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else {
			if(w.getUsername().equals("-1")) //already exists, not created
				return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			else
				return  new ResponseEntity<>(HttpStatus.CREATED);//success
		}
			
	}
	
	@DeleteMapping("/worker/delete")
	public ResponseEntity<?> deleteWorker(@RequestBody Worker worker){
		Worker w=userService.deleteWorker(worker);
		if(w==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else 
			return  new ResponseEntity<>(HttpStatus.OK);//success
	}
	
	@GetMapping("/worker/all")
	public ResponseEntity<?> workerList(){
		List<Worker> l=userService.workerList();
		if(l==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else 
			return  new ResponseEntity<>(l, HttpStatus.OK);//success
	}
}
