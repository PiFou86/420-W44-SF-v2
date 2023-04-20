using GC.BL;
using GC.Entites;
using GC.WebReact.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GC.WebReact.Controllers
{
    //[Authorize]
    [Route("[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly GestionClientsBL m_gestionClient;

        public ClientsController(GestionClientsBL p_gestionClients)
        {
            if (p_gestionClients is null)
            {
                throw new ArgumentNullException(nameof(p_gestionClients));
            }

            this.m_gestionClient = p_gestionClients;
        }

        [HttpGet("generer")]
        [ProducesResponseType(200)]
        public ActionResult GenererClients()
        {
            this.m_gestionClient.GenererEtAjouterClientsPourDemos(10);

            return Ok();
        }

        // GET: api/<ClientController>
        [HttpGet]
        [ProducesResponseType(200)]
        public ActionResult<IEnumerable<ClientViewModel>> Get()
        {
            return Ok(this.m_gestionClient.ObtenirClients().Select(c => new ClientViewModel(c)).OrderBy(c => c.Prenom + ";" + c.Nom));
        }

        // GET api/<ClientController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(500)]
        public ActionResult<ClientViewModel> Get(int id)
        {
            throw new NotImplementedException();
        }

        // POST api/<ClientController>
        [HttpPost]
        [ProducesResponseType(500)]
        public ActionResult Post([FromBody] string value)
        {
            throw new NotImplementedException();
        }

        // PUT api/<ClientController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(500)]
        public void Put(int id, [FromBody] string value)
        {
            throw new NotImplementedException();
        }

        // DELETE api/<ClientController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(500)]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
