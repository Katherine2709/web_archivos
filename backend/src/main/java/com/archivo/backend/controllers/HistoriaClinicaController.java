package com.archivo.backend.controllers;


import com.archivo.backend.services.HistoriaClinicaService;

import org.springframework.web.bind.annotation.*;




@RestController
@RequestMapping("/historiaclinica")
public class HistoriaClinicaController {

    private final HistoriaClinicaService historiaClinicaService;

    public HistoriaClinicaController(HistoriaClinicaService historiaClinicaService) {
        this.historiaClinicaService = historiaClinicaService;
    }
}