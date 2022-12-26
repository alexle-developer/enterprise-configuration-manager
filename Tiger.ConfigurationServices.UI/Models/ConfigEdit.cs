using System;
using System.Collections.Generic;

namespace Tiger.ConfigurationServices.UI.Models
{
    public partial class ConfigEdit
    {
        public int ConfigEditKey { get; set; }
        public int ConfigKey { get; set; }
        public string ConfigName { get; set; }
        public byte CuroDbServerKey { get; set; }
        public byte ApplogDbServerKey { get; set; }
        public bool IsProduction { get; set; }
        public string Description { get; set; }
        public string ActionType { get; set; }
        public string Tlr { get; set; }
        public DateTime? DateEntered { get; set; }
        public string TellerName { get; set; }
    }
}
