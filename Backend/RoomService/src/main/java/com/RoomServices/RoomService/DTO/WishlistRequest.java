package com.RoomServices.RoomService.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class WishlistRequest {
 @NotNull
    private Long userId;

    @NotNull
    private Long roomId;

}
