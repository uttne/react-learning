using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageController : Controller
    {
        private static int _index = 0;
        
        [HttpGet]
        [Route("data.png")]
        public IActionResult Get()
        {
            var contentType = "image/png";
            
            var embeddedProvider = new EmbeddedFileProvider(Assembly.GetAssembly(typeof(ImageController)));
            var imageFileInfo = embeddedProvider.GetFileInfo(@$"images/{_index:000}.png");
            if (imageFileInfo.Exists == false)
            {
                _index = 0;
                imageFileInfo = embeddedProvider.GetFileInfo(@$"images/{_index:000}.png");
            }

            ++_index;
            
            var ms = new MemoryStream();
            using var srcStream = imageFileInfo.CreateReadStream();
            srcStream.CopyTo(ms);
            ms.Flush();

            ms.Position = 0;
            return File(ms, contentType);
        }
    }
}