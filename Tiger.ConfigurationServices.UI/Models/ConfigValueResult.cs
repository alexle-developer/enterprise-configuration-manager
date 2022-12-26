namespace Tiger.ConfigurationServices.UI.Models
{
    public partial class ConfigValueResult
    {
        public int ConfigValueKey { get; set; }
        public byte ConfigKey { get; set; }
        public short ConfigSettingKey { get; set; }
        public string ConfigName { get; set; }
        public string ConfigSettingName { get; set; }
        public string ConfigValue { get; set; }
    }
}