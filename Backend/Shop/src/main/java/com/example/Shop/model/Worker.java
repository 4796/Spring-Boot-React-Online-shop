package com.example.Shop.model;

import java.util.Objects;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Worker extends User {
	double pay;
	
	
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		User other = (User) obj;
		return Objects.equals(getPassword(), other.getPassword()) && Objects.equals(getUsername(), other.getUsername());
	}
	@Override
	public int hashCode() {
		return Objects.hash(getPassword(), getUsername());
	}
	@Override
	public String toString() {
		return "Worker [pay=" + pay + ", username=" + getUsername() + ", password=" + getPassword() + "]";
	}
}
