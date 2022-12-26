using System;
using System.Collections.Generic;

namespace Tiger.ConfigurationServices.UI.Models
{
    public partial class ServersEdit
    {
        public int ServersEditKey { get; set; }
        public int ServersKey { get; set; }
        public string ServerName { get; set; }
        public string ServerType { get; set; }
        public bool IsActive { get; set; }
        public string ActionType { get; set; }
        public string Tlr { get; set; }
        public DateTime? DateEntered { get; set; }
        public string TellerName { get; set; }
    }
}
