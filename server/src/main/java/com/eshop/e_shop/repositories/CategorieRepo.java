package com.eshop.e_shop.repositories;

import com.eshop.e_shop.domain.models.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorieRepo extends JpaRepository<Categories, Long> {

}
