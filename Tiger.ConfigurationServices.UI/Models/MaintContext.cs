using Microsoft.EntityFrameworkCore;

namespace Tiger.ConfigurationServices.UI.Models
{
    public partial class MaintContext : DbContext
    {
        public MaintContext()
        {
        }

        public MaintContext(DbContextOptions<MaintContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Config> Config { get; set; }
        public virtual DbSet<ConfigEdit> ConfigEdit { get; set; }
        public virtual DbSet<ConfigSetting> ConfigSetting { get; set; }
        public virtual DbSet<ConfigSettingEdit> ConfigSettingEdit { get; set; }
        public virtual DbSet<ConfigValue> ConfigValue { get; set; }
        public virtual DbSet<ConfigValueEdit> ConfigValueEdit { get; set; }
        public virtual DbSet<Servers> Servers { get; set; }
        public virtual DbSet<ServersEdit> ServersEdit { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=srcmaint;Initial Catalog=Maint;Integrated Security=False;User Id=Maint;Password=Yg98pwHw-u0qxl;MultipleActiveResultSets=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Config>(entity =>
            {
                entity.HasKey(e => e.ConfigKey);

                entity.HasIndex(e => e.ConfigName);

                entity.Property(e => e.ConfigKey)
                    .HasColumnName("CONFIG_KEY")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ApplogDbServerKey).HasColumnName("APPLOG_DB_SERVER_KEY");

                entity.Property(e => e.ConfigName)
                    .IsRequired()
                    .HasColumnName("CONFIG_NAME")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.CuroDbServerKey).HasColumnName("CURO_DB_SERVER_KEY");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("DESCRIPTION")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.IsProduction).HasColumnName("IS_PRODUCTION");

                entity.HasOne(d => d.ApplogDbServerKeyNavigation)
                    .WithMany(p => p.ConfigApplogDbServerKeyNavigation)
                    .HasForeignKey(d => d.ApplogDbServerKey)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Config_APPLOG_DB_SERVER_KEY");

                entity.HasOne(d => d.CuroDbServerKeyNavigation)
                    .WithMany(p => p.ConfigCuroDbServerKeyNavigation)
                    .HasForeignKey(d => d.CuroDbServerKey)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Config_CURO_DB_SERVER_KEY");
            });

            modelBuilder.Entity<ConfigEdit>(entity =>
            {
                entity.HasKey(e => e.ConfigEditKey);

                entity.HasIndex(e => new { e.DateEntered, e.ActionType, e.ConfigKey, e.ConfigName })
                    .HasName("IX_ConfigEdit_DATE_ENTERED_ACTION_TYPE_CONFIG_NAME");

                entity.Property(e => e.ConfigEditKey).HasColumnName("CONFIG_EDIT_KEY");

                entity.Property(e => e.ActionType)
                    .HasColumnName("ACTION_TYPE")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ApplogDbServerKey).HasColumnName("APPLOG_DB_SERVER_KEY");

                entity.Property(e => e.ConfigKey).HasColumnName("CONFIG_KEY");

                entity.Property(e => e.ConfigName)
                    .IsRequired()
                    .HasColumnName("CONFIG_NAME")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.CuroDbServerKey).HasColumnName("CURO_DB_SERVER_KEY");

                entity.Property(e => e.DateEntered)
                    .HasColumnName("DATE_ENTERED")
                    .HasColumnType("datetime");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("DESCRIPTION")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.IsProduction).HasColumnName("IS_PRODUCTION");

                entity.Property(e => e.TellerName)
                    .HasColumnName("TELLER_NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Tlr)
                    .HasColumnName("TLR")
                    .HasMaxLength(3)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ConfigSetting>(entity =>
            {
                entity.HasKey(e => e.ConfigSettingKey);

                entity.Property(e => e.ConfigSettingKey).HasColumnName("CONFIG_SETTING_KEY");

                entity.Property(e => e.ConfigSettingName)
                    .IsRequired()
                    .HasColumnName("CONFIG_SETTING_NAME")
                    .HasMaxLength(35)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("DESCRIPTION")
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ConfigSettingEdit>(entity =>
            {
                entity.HasKey(e => e.ConfigSettingEditKey);

                entity.HasIndex(e => new { e.DateEntered, e.ActionType, e.ConfigSettingKey, e.ConfigSettingName })
                    .HasName("IX_ConfigSettingEdit_DATE_ENTERED_ACTION_TYPE_CONFIG_SETTING_NAME");

                entity.Property(e => e.ConfigSettingEditKey).HasColumnName("CONFIG_SETTING_EDIT_KEY");

                entity.Property(e => e.ActionType)
                    .HasColumnName("ACTION_TYPE")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ConfigSettingKey).HasColumnName("CONFIG_SETTING_KEY");

                entity.Property(e => e.ConfigSettingName)
                    .IsRequired()
                    .HasColumnName("CONFIG_SETTING_NAME")
                    .HasMaxLength(35)
                    .IsUnicode(false);

                entity.Property(e => e.DateEntered)
                    .HasColumnName("DATE_ENTERED")
                    .HasColumnType("datetime");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("DESCRIPTION")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.TellerName)
                    .HasColumnName("TELLER_NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Tlr)
                    .HasColumnName("TLR")
                    .HasMaxLength(3)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ConfigValue>(entity =>
            {
                entity.HasKey(e => e.ConfigValueKey);

                entity.HasIndex(e => e.ConfigKey);

                entity.Property(e => e.ConfigValueKey).HasColumnName("CONFIG_VALUE_KEY");

                entity.Property(e => e.ConfigKey).HasColumnName("CONFIG_KEY");

                entity.Property(e => e.ConfigSettingKey).HasColumnName("CONFIG_SETTING_KEY");

                entity.Property(e => e.ConfigValue1)
                    .IsRequired()
                    .HasColumnName("CONFIG_VALUE")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.ConfigKeyNavigation)
                    .WithMany(p => p.ConfigValue)
                    .HasForeignKey(d => d.ConfigKey)
                    .HasConstraintName("FK_ConfigValue_CONFIG_KEY");

                entity.HasOne(d => d.ConfigSettingKeyNavigation)
                    .WithMany(p => p.ConfigValue)
                    .HasForeignKey(d => d.ConfigSettingKey)
                    .HasConstraintName("FK_ConfigValue_CONFIG_SETTING_KEY");
            });

            modelBuilder.Entity<ConfigValueEdit>(entity =>
            {
                entity.HasKey(e => e.ConfigValueEditKey);

                entity.HasIndex(e => new { e.DateEntered, e.ActionType, e.ConfigValueKey });

                entity.Property(e => e.ConfigValueEditKey).HasColumnName("CONFIG_VALUE_EDIT_KEY");

                entity.Property(e => e.ActionType)
                    .HasColumnName("ACTION_TYPE")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ConfigKey).HasColumnName("CONFIG_KEY");

                entity.Property(e => e.ConfigSettingKey).HasColumnName("CONFIG_SETTING_KEY");

                entity.Property(e => e.ConfigValue)
                    .IsRequired()
                    .HasColumnName("CONFIG_VALUE")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.ConfigValueKey).HasColumnName("CONFIG_VALUE_KEY");

                entity.Property(e => e.DateEntered)
                    .HasColumnName("DATE_ENTERED")
                    .HasColumnType("datetime");

                entity.Property(e => e.TellerName)
                    .HasColumnName("TELLER_NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Tlr)
                    .HasColumnName("TLR")
                    .HasMaxLength(3)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Servers>(entity =>
            {
                entity.HasKey(e => e.ServersKey);

                entity.Property(e => e.ServersKey)
                    .HasColumnName("SERVERS_KEY")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.IsActive).HasColumnName("IS_ACTIVE");

                entity.Property(e => e.ServerName)
                    .IsRequired()
                    .HasColumnName("SERVER_NAME")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ServerType)
                    .IsRequired()
                    .HasColumnName("SERVER_TYPE")
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ServersEdit>(entity =>
            {
                entity.HasKey(e => e.ServersEditKey);

                entity.Property(e => e.ServersEditKey).HasColumnName("SERVERS_EDIT_KEY");

                entity.Property(e => e.ActionType)
                    .HasColumnName("ACTION_TYPE")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.DateEntered)
                    .HasColumnName("DATE_ENTERED")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsActive).HasColumnName("IS_ACTIVE");

                entity.Property(e => e.ServerName)
                    .IsRequired()
                    .HasColumnName("SERVER_NAME")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ServerType)
                    .IsRequired()
                    .HasColumnName("SERVER_TYPE")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ServersKey).HasColumnName("SERVERS_KEY");

                entity.Property(e => e.TellerName)
                    .HasColumnName("TELLER_NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Tlr)
                    .HasColumnName("TLR")
                    .HasMaxLength(3)
                    .IsUnicode(false);
            });
        }
    }
}

//// http://www.entityframeworktutorial.net/efcore/entity-framework-core-dbcontext.aspx
//// this class was auto-generated by using EF Scaffolding with Package Manager Console
/// <summary>
/// To add brand new entity use the command below
/// </summary>
////  PM> Scaffold-DbContext "Data Source=srcmaint;Initial Catalog=Maint;Integrated Security=False;User Id=Maint;Password=Yg98pwHw-u0qxl;MultipleActiveResultSets=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Table Config, ConfigSetting, ConfigValue
/// <summary>
/// To replace an existing entity use the command below with Force option (-f).
/// This option will complete replace the existing entities.  You may have to do a compare and then cut & paste.
/// The alterative is to add existing tables and new tables to the "Table" options in the command
/// </summary>
////  PM> Scaffold-DbContext "Data Source=srcmaint;Initial Catalog=Maint;Integrated Security=False;User Id=Maint;Password=Yg98pwHw-u0qxl;MultipleActiveResultSets=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Table Config, ConfigSetting, ConfigValue, ConfigEdit, ConfigSettingEdit, ConfigValueEdit, Servers, ServersEdit -f