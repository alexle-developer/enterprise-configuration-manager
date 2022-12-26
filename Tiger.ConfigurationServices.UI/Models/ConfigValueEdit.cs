using System;
using System.Collections.Generic;

namespace Tiger.ConfigurationServices.UI.Models
{
    public partial class ConfigValueEdit
    {
        public int ConfigValueEditKey { get; set; }
        public int ConfigValueKey { get; set; }
        public int ConfigKey { get; set; }
        public int ConfigSettingKey { get; set; }
        public string ConfigValue { get; set; }
        public string ActionType { get; set; }
        public string Tlr { get; set; }
        public DateTime? DateEntered { get; set; }
        public string TellerName { get; set; }
    }
}
