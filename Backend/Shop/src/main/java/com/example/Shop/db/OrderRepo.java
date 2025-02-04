package com.example.Shop.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.Shop.model.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer>{

}
