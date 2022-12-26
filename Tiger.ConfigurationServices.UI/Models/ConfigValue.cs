using System;
using System.Collections.Generic;

namespace Tiger.ConfigurationServices.UI.Models
{
    public partial class ConfigValue
    {
        public int ConfigValueKey { get; set; }
        public byte ConfigKey { get; set; }
        public short ConfigSettingKey { get; set; }
        public string ConfigValue1 { get; set; }

        public Config ConfigKeyNavigation { get; set; }
        public ConfigSetting ConfigSettingKeyNavigation { get; set; }
    }
}
