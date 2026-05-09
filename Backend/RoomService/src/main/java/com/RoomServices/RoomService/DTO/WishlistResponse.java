package com.RoomServices.RoomService.DTO;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class WishlistResponse {

    private Long id;
    private Long userId;
    private Long roomId;
    private LocalDate addedDate;
}