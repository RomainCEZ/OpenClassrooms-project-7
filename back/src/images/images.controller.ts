import { Controller, Get, Param, Res } from "@nestjs/common";
import { join } from "path";

@Controller("profilepicture")
export class ImagesController {
  @Get(":imageName")
  findImage(@Param("imageName") imageName: string, @Res() res: any) {
    return res.sendFile(join(process.cwd(), "profilepicture/" + imageName))
  }
}