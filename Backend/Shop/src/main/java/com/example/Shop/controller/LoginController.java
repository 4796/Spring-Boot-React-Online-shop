package com.example.Shop.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import com.example.Shop.model.Client;
import com.example.Shop.model.Order;
import com.example.Shop.model.Product;
import com.example.Shop.model.User;
import com.example.Shop.model.Worker;
import com.example.Shop.service.AuthService;
import com.example.Shop.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class LoginController {
	
//	@Autowired
//	ProductService productService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	AuthService authService;
	
	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody User user){
		User u=userService.logIn(user);
		if(u==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else {
			String token = authService.generateToken(user.getUsername());
			u.setToken(token);
			return  new ResponseEntity<>(u, HttpStatus.OK);
		}
			
	}
	
	//client     da
	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody Client client){
		Client c=userService.register(client);
		if(c==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else
			return  new ResponseEntity<>(HttpStatus.OK);
	}
	//da
	@PostMapping("/products/{id}/addtocart") 
	public ResponseEntity<?> addToCart(@PathVariable int id, @RequestBody Client client, @RequestHeader("Authorization") String token){
		String username = authService.validateTokenAndGetUser(token); // Proverava token
        if (username == null || !username.equals(client.getUsername())) {
        	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // Ako je token nevalidan, vraća 401 Unauthorized
        }
        
		
		Client c=userService.addToCart(id, client);
		if(c==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else
			return  new ResponseEntity<>(c, HttpStatus.OK);
	}
	//da
	@PostMapping("/api/products/{id}/buy")
	public ResponseEntity<Order> buy(@RequestBody Order order, @RequestHeader("Authorization") String token) {
		String username = authService.validateTokenAndGetUser(token); 
        if (username == null || !username.equals(order.getClient().getUsername())) {
        	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); 
        }
		
		Order o=userService.buy(order);
		if(o==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else
			return  new ResponseEntity<>(o, HttpStatus.OK);
		
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
	
	//worker   da
	@PostMapping("/worker/add")
	public ResponseEntity<?> newWorker(@RequestBody Map<String, Object> mapa, @RequestHeader("Authorization") String token){
		String me="";
		Worker worker=null;
		try {
			me=mapa.get("username").toString();
			ObjectMapper objectMapper = new ObjectMapper();
	        worker = objectMapper.convertValue(mapa.get("newworker"), Worker.class);
		//	worker=(Worker) mapa.get("newworker");
			String username = authService.validateTokenAndGetUser(token); 
	        if (username == null || !username.equals(me)) {
	        	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	        }
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		
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
	
	//worker     da
	@PutMapping("/worker/update")//samog sebe moze da menja, da bi radilo ovo za autentifikaciju
	public ResponseEntity<Worker> updateWorker(@RequestBody Worker worker, @RequestHeader("Authorization") String token){
		String username = authService.validateTokenAndGetUser(token); 
        if (username == null || !username.equals(worker.getUsername())) {
        	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); 
        }
        
        
		Worker w=userService.updateWorker(worker);
		if(w==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else {
			if(w.getUsername().equals("-1")) //already exists, not created
				return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			else
				return  new ResponseEntity<>(w, HttpStatus.CREATED);//success
		}
			
	}
	
	//worker
	@DeleteMapping("/worker/delete")//samog sebe moze da menja, da bi radilo ovo za autentifikaciju
	public ResponseEntity<?> deleteWorker(@RequestBody String worker, @RequestHeader("Authorization") String token){
		worker=worker.substring(1, worker.length()-1);
		String username = authService.validateTokenAndGetUser(token); 
        if (username == null || !username.equals(worker)) {
        	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); 
        }
        
		String w=userService.deleteWorker(worker);
		if(w==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else 
			return  new ResponseEntity<>(HttpStatus.OK);//success
	}
	
	//worker     da
	@GetMapping("/worker/all")
	public ResponseEntity<?> workerList(@RequestHeader("Authorization") String token){
		String username = authService.validateTokenAndGetUser(token); 
        if (username == null) {
        	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); 
        }
        
		List<Worker> l=userService.workerList();
		if(l==null)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		else 
			return  new ResponseEntity<>(l, HttpStatus.OK);//success
	}
}
