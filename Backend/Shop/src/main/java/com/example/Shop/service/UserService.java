package com.example.Shop.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Shop.db.ClientRepo;
import com.example.Shop.db.OrderRepo;
import com.example.Shop.db.ProductRepo;
import com.example.Shop.db.WorkerRepo;
import com.example.Shop.model.Client;
import com.example.Shop.model.Order;
import com.example.Shop.model.Product;
import com.example.Shop.model.User;
import com.example.Shop.model.Worker;

import jakarta.transaction.Transactional;

@Service
public class UserService {
	@Autowired
	private WorkerRepo workerRepo;
	
	@Autowired
	private ClientRepo clientRepo;
	
	@Autowired
	private OrderRepo orderRepo;
	
	@Autowired
	private ProductRepo productRepo;

	public User logIn(User u) {
		
		User found=null;
		try {
			List<Client> l1 = clientRepo.findAll();
			
			for(Client c : l1) {
				if(c.equals(u)) {
					found=c;
					break;
				}
			}
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(found!=null)
			return found;
		
			try {

					List<Worker> l2 = workerRepo.findAll();
					for(Worker w : l2) {
						if(w.equals(u)) {
							found=w;
							break;
						}
					}
					
			} catch (Exception e) {
				e.printStackTrace();
			}
		
		
		
		

		return found;
	}

	@Transactional
	public Client register(Client client) {
		if (clientRepo.existsById(client.getUsername()))
			return null;
		return clientRepo.save(client);
	}

	@Transactional
	public Client addToCart(int id, Client client) {
		try {
			Product p=new Product();
			p.setId(id);
			client.getProductsInCart().add(p);
			Client c=clientRepo.save(client);
			return c;
		} catch (Exception e) {
			return null;
		}
		
		
	}

	@Transactional
	public Order buy(Order order) {
		try {
			
			Product p= productRepo.findById(order.getProduct().getId()).orElseThrow();
			if(!p.isAveilable())
				return null;
			p.setQuantity(p.getQuantity()-1);
			if(p.getQuantity()==0)
				p.setAveilable(false);
			productRepo.save(p);
			Client c=order.getClient();
			c=clientRepo.findById(c.getUsername()).orElseThrow();
			List<Product> l = c.getProductsInCart();
			l.remove(p);
			c.setProductsInCart(l);
			clientRepo.save(c);
			return orderRepo.save(order);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		
	}

	@Transactional
	public Worker addWorker(Worker worker) {
		try {
			if(worker.getUsername().length()<3 || worker.getPassword().length()<3) {
		//previse jednostavno
					Worker r= new Worker();
					r.setUsername("-1");
					return r;
				
			}
				
			Worker w=workerRepo.findById(worker.getUsername()).orElse(null);
			if(w!=null) { //vec postoji
				Worker r= new Worker();
				r.setUsername("0");
				return r;
			}
			return workerRepo.save(worker);
				
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		
	}

	@Transactional
	public Worker updateWorker(Worker worker) {
		try {
			if(worker.getUsername().length()<3 || worker.getPassword().length()<3) {
		//previse jednostavno
					Worker r= new Worker();
					r.setUsername("-1");
					return r;
				
			}
				
			return workerRepo.save(worker);
				
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}

	@Transactional
	public Worker deleteWorker(Worker worker) {
		try {
			workerRepo.deleteById(worker.getUsername());
			return worker;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public List<Worker> workerList() {
		try {
			return workerRepo.findAll();
		} catch (Exception e) {
			return null;
		}
	}
	
	
	
	
	
}
