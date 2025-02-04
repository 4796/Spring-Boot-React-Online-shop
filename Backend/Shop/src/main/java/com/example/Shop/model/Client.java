package com.example.Shop.model;

import java.util.List;
import java.util.Objects;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Client extends User {
	String name;
	@ManyToMany
	List<Product> productsInCart;
	@Override
	public String toString() {
		return "Client [name=" + name + ", productsInCart=" + productsInCart + ", username=" + getUsername() + ", password="
				+ getPassword() + "]";
	}
	
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		User other = (User) obj;
		return Objects.equals(this.getPassword(), other.getPassword()) && Objects.equals(getUsername(), other.getUsername());
	}
	@Override
	public int hashCode() {
		return Objects.hash(getPassword(), getUsername());
	}
}
