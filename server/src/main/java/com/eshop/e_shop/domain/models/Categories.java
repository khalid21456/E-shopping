package com.eshop.e_shop.domain.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Categories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // works with PostgreSQL auto-increment
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
}
