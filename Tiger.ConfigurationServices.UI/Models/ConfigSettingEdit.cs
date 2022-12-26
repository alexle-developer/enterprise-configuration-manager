using System;
using System.Collections.Generic;

namespace Tiger.ConfigurationServices.UI.Models
{
    public partial class ConfigSettingEdit
    {
        public int ConfigSettingEditKey { get; set; }
        public int ConfigSettingKey { get; set; }
        public string ConfigSettingName { get; set; }
        public string Description { get; set; }
        public string ActionType { get; set; }
        public string Tlr { get; set; }
        public DateTime? DateEntered { get; set; }
        public string TellerName { get; set; }
    }
}
