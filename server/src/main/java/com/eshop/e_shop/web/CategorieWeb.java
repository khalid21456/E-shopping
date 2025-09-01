package com.eshop.e_shop.web;


import com.eshop.e_shop.domain.models.Categories;
import com.eshop.e_shop.repositories.CategorieRepo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@SuppressWarnings("unused")
@RestController
@RequestMapping("/categorie")
@CrossOrigin

public class CategorieWeb {

    final private CategorieRepo categorieRepo;

    public CategorieWeb(CategorieRepo categorieRepo) {
        this.categorieRepo = categorieRepo;
    }

    @GetMapping("/get")
    public List<Categories> getCategorie() {
        return categorieRepo.findAll();
    }
}
