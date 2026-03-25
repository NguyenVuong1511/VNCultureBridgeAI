
/* =========================================================
   CSDL: VNCultureBridgeAI
   SQL Server - Ban chot cuoi theo nghiep vu
   ========================================================= */
IF DB_ID(N'VNCultureBridgeAI') IS NULL
BEGIN
    CREATE DATABASE VNCultureBridgeAI;
END
GO

USE VNCultureBridgeAI;
GO

SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

/* =========================================================
   1. NGON NGU
   ========================================================= */
CREATE TABLE NGON_NGU
(
    MaNgonNgu           VARCHAR(10) PRIMARY KEY,
    TenNgonNgu          NVARCHAR(100) NOT NULL,
    TenBanDia           NVARCHAR(100) NOT NULL,
    LaMacDinh           BIT NOT NULL DEFAULT 0,
    HoatDong            BIT NOT NULL DEFAULT 1
);
GO

/* =========================================================
   2. QUAN TRI - NGUOI DUNG - VAI TRO
   ========================================================= */
CREATE TABLE QUAN_TRI_NGUOI_DUNG
(
    IDNguoiDung         BIGINT IDENTITY(1,1) PRIMARY KEY,
    TenDangNhap         NVARCHAR(100) NOT NULL UNIQUE,
    Email               NVARCHAR(255) NOT NULL UNIQUE,
    MatKhauHash         NVARCHAR(255) NOT NULL,
    HoTen               NVARCHAR(150) NOT NULL,
    TrangThai           VARCHAR(20) NOT NULL
                        CHECK (TrangThai IN ('HOAT_DONG','NGUNG_HOAT_DONG','KHOA')),
    LanDangNhapCuoi     DATETIME2(0) NULL,
    NgayTao             DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    NgayCapNhat         DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    RowVer              ROWVERSION
);
GO

CREATE TABLE QUAN_TRI_VAI_TRO
(
    IDVaiTro            BIGINT IDENTITY(1,1) PRIMARY KEY,
    MaVaiTro            VARCHAR(50) NOT NULL UNIQUE,
    TenVaiTro           NVARCHAR(100) NOT NULL,
    MoTa                NVARCHAR(300) NULL
);
GO

CREATE TABLE QUAN_TRI_NGUOI_DUNG_VAI_TRO
(
    IDNguoiDung         BIGINT NOT NULL,
    IDVaiTro            BIGINT NOT NULL,
    NgayGan             DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    IDNguoiGan          BIGINT NULL,
    PRIMARY KEY (IDNguoiDung, IDVaiTro),
    FOREIGN KEY (IDNguoiDung) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDVaiTro) REFERENCES QUAN_TRI_VAI_TRO(IDVaiTro),
    FOREIGN KEY (IDNguoiGan) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

CREATE TABLE QUAN_TRI_QUYEN
(
    IDQuyen             BIGINT IDENTITY(1,1) PRIMARY KEY,
    MaQuyen             VARCHAR(100) NOT NULL UNIQUE,
    TenQuyen            NVARCHAR(200) NOT NULL,
    MoTa                NVARCHAR(500) NULL
);
GO

CREATE TABLE QUAN_TRI_VAI_TRO_QUYEN
(
    IDVaiTro            BIGINT NOT NULL,
    IDQuyen             BIGINT NOT NULL,
    PRIMARY KEY (IDVaiTro, IDQuyen),
    FOREIGN KEY (IDVaiTro) REFERENCES QUAN_TRI_VAI_TRO(IDVaiTro),
    FOREIGN KEY (IDQuyen) REFERENCES QUAN_TRI_QUYEN(IDQuyen)
);
GO

/* =========================================================
   3. DANH MUC NEN - TAXONOMY
   ========================================================= */
CREATE TABLE DANH_MUC_CHU_DE
(
    IDDanhMuc           BIGINT IDENTITY(1,1) PRIMARY KEY,
    MaDanhMuc           VARCHAR(50) NOT NULL UNIQUE,
    IDDanhMucCha        BIGINT NULL,
    ThuTuSapXep         INT NOT NULL DEFAULT 0,
    HoatDong            BIT NOT NULL DEFAULT 1,
    NgayTao             DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDDanhMucCha) REFERENCES DANH_MUC_CHU_DE(IDDanhMuc)
);
GO

CREATE TABLE DANH_MUC_CHU_DE_BAN_DICH
(
    IDDanhMuc           BIGINT NOT NULL,
    MaNgonNgu           VARCHAR(10) NOT NULL,
    TenDanhMuc          NVARCHAR(200) NOT NULL,
    MoTa                NVARCHAR(1000) NULL,
    PRIMARY KEY (IDDanhMuc, MaNgonNgu),
    FOREIGN KEY (IDDanhMuc) REFERENCES DANH_MUC_CHU_DE(IDDanhMuc),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE VUNG_VAN_HOA
(
    IDVung              BIGINT IDENTITY(1,1) PRIMARY KEY,
    MaVung              VARCHAR(50) NOT NULL UNIQUE,
    IDVungCha           BIGINT NULL,
    LoaiVung            VARCHAR(20) NOT NULL
                        CHECK (LoaiVung IN ('DIA_LY','VAN_HOA')),
    DuLieuBanDoGeoJson  NVARCHAR(MAX) NULL,
    ThuTuSapXep         INT NOT NULL DEFAULT 0,
    HoatDong            BIT NOT NULL DEFAULT 1,
    NgayTao             DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDVungCha) REFERENCES VUNG_VAN_HOA(IDVung)
);
GO

CREATE TABLE VUNG_VAN_HOA_BAN_DICH
(
    IDVung              BIGINT NOT NULL,
    MaNgonNgu           VARCHAR(10) NOT NULL,
    TenVung             NVARCHAR(200) NOT NULL,
    MoTa                NVARCHAR(1000) NULL,
    PRIMARY KEY (IDVung, MaNgonNgu),
    FOREIGN KEY (IDVung) REFERENCES VUNG_VAN_HOA(IDVung),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE DAN_TOC
(
    IDDanToc            BIGINT IDENTITY(1,1) PRIMARY KEY,
    MaDanToc            VARCHAR(50) NOT NULL UNIQUE,
    ThuTuSapXep         INT NOT NULL DEFAULT 0,
    HoatDong            BIT NOT NULL DEFAULT 1,
    NgayTao             DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE DAN_TOC_BAN_DICH
(
    IDDanToc            BIGINT NOT NULL,
    MaNgonNgu           VARCHAR(10) NOT NULL,
    TenDanToc           NVARCHAR(200) NOT NULL,
    MoTa                NVARCHAR(1000) NULL,
    PRIMARY KEY (IDDanToc, MaNgonNgu),
    FOREIGN KEY (IDDanToc) REFERENCES DAN_TOC(IDDanToc),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE THE_NOI_DUNG
(
    IDThe               BIGINT IDENTITY(1,1) PRIMARY KEY,
    MaThe               VARCHAR(100) NOT NULL UNIQUE,
    HoatDong            BIT NOT NULL DEFAULT 1,
    NgayTao             DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE THE_NOI_DUNG_BAN_DICH
(
    IDThe               BIGINT NOT NULL,
    MaNgonNgu           VARCHAR(10) NOT NULL,
    TenThe              NVARCHAR(200) NOT NULL,
    MoTa                NVARCHAR(500) NULL,
    PRIMARY KEY (IDThe, MaNgonNgu),
    FOREIGN KEY (IDThe) REFERENCES THE_NOI_DUNG(IDThe),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE TU_KHOA
(
    IDTuKhoa            BIGINT IDENTITY(1,1) PRIMARY KEY,
    MaTuKhoa            VARCHAR(100) NOT NULL UNIQUE,
    HoatDong            BIT NOT NULL DEFAULT 1,
    NgayTao             DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE TU_KHOA_BAN_DICH
(
    IDTuKhoa            BIGINT NOT NULL,
    MaNgonNgu           VARCHAR(10) NOT NULL,
    TuKhoaHienThi       NVARCHAR(200) NOT NULL,
    PRIMARY KEY (IDTuKhoa, MaNgonNgu),
    FOREIGN KEY (IDTuKhoa) REFERENCES TU_KHOA(IDTuKhoa),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

/* =========================================================
   4. BAI VIET VAN HOA
   ========================================================= */
CREATE TABLE BAI_VIET
(
    IDBaiViet                   BIGINT IDENTITY(1,1) PRIMARY KEY,
    DuongDanSeo                 NVARCHAR(200) NOT NULL UNIQUE,
    MaNgonNguGoc                VARCHAR(10) NOT NULL DEFAULT 'vi',
    LoaiBaiViet                 VARCHAR(30) NOT NULL
                                CHECK (LoaiBaiViet IN ('LE_HOI','TIN_NGUONG','PHONG_TUC','AM_THUC',
                                                       'TRANG_PHUC','NGHE_THUAT_DAN_GIAN',
                                                       'KIEN_TRUC','BIEU_TUONG','VAN_HOA_DAN_TOC','CHUNG')),
    TrangThai                   VARCHAR(20) NOT NULL DEFAULT 'NHAP'
                                CHECK (TrangThai IN ('NHAP','CHO_DUYET','DA_DUYET','DA_XUAT_BAN','AN','LUU_TRU','TU_CHOI')),
    CapDoNhayCam                TINYINT NOT NULL DEFAULT 1
                                CHECK (CapDoNhayCam BETWEEN 1 AND 5),
    MucDoKiemDuyet              VARCHAR(20) NOT NULL DEFAULT 'THUONG'
                                CHECK (MucDoKiemDuyet IN ('THUONG','CHAT')),
    NoiDungNoiBat               BIT NOT NULL DEFAULT 0,
    CanDongBoAI                 BIT NOT NULL DEFAULT 1,
    TrangThaiDongBoAI           VARCHAR(20) NOT NULL DEFAULT 'CHO_DONG_BO'
                                CHECK (TrangThaiDongBoAI IN ('KHONG_CAN','CHO_DONG_BO','DANG_DONG_BO','SAN_SANG','LOI')),
    GhiChuBienTap               NVARCHAR(2000) NULL,
    LyDoTuChoi                  NVARCHAR(2000) NULL,
    NgayDuyet                   DATETIME2(0) NULL,
    IDNguoiDuyet                BIGINT NULL,
    NgayXuatBan                 DATETIME2(0) NULL,
    IDNguoiXuatBan              BIGINT NULL,
    NgayAn                      DATETIME2(0) NULL,
    IDNguoiAn                   BIGINT NULL,
    NgayLuuTru                  DATETIME2(0) NULL,
    IDNguoiLuuTru               BIGINT NULL,
    IDPhienBanXuatBanHienTai    BIGINT NULL,
    IDNguoiTao                  BIGINT NOT NULL,
    IDNguoiCapNhat              BIGINT NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    NgayCapNhat                 DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    RowVer                      ROWVERSION,
    FOREIGN KEY (MaNgonNguGoc) REFERENCES NGON_NGU(MaNgonNgu),
    FOREIGN KEY (IDNguoiDuyet) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDNguoiXuatBan) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDNguoiAn) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDNguoiLuuTru) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDNguoiTao) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDNguoiCapNhat) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

CREATE TABLE BAI_VIET_BAN_DICH
(
    IDBanDich                   BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDBaiViet                   BIGINT NOT NULL,
    MaNgonNgu                   VARCHAR(10) NOT NULL,
    TieuDe                      NVARCHAR(300) NOT NULL,
    TomTat                      NVARCHAR(1000) NULL,
    GioiThieu                   NVARCHAR(MAX) NULL,
    NguonGoc                    NVARCHAR(MAX) NULL,
    YNghiaVanHoa                NVARCHAR(MAX) NULL,
    BoiCanhSuDung               NVARCHAR(MAX) NULL,
    NoiDungChiTiet              NVARCHAR(MAX) NULL,
    GhiChuCultureShock          NVARCHAR(MAX) NULL,
    TieuDeSEO                   NVARCHAR(255) NULL,
    MoTaSEO                     NVARCHAR(500) NULL,
    SoPhutDoc                   INT NULL,
    LaBanDichMay                BIT NOT NULL DEFAULT 0,
    TrangThaiBanDich            VARCHAR(20) NOT NULL DEFAULT 'NHAP'
                                CHECK (TrangThaiBanDich IN ('NHAP','DA_SOAT','DA_DUYET','DA_XUAT_BAN')),
    IDNguoiSoat                 BIGINT NULL,
    NgaySoat                    DATETIME2(0) NULL,
    GhiChuDichGia               NVARCHAR(1000) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    NgayCapNhat                 DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    UNIQUE (IDBaiViet, MaNgonNgu),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu),
    FOREIGN KEY (IDNguoiSoat) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

CREATE TABLE BAI_VIET_DANH_MUC
(
    IDBaiViet                   BIGINT NOT NULL,
    IDDanhMuc                   BIGINT NOT NULL,
    LaDanhMucChinh              BIT NOT NULL DEFAULT 0,
    PRIMARY KEY (IDBaiViet, IDDanhMuc),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDDanhMuc) REFERENCES DANH_MUC_CHU_DE(IDDanhMuc)
);
GO

CREATE UNIQUE INDEX UX_BAI_VIET_DANH_MUC_CHINH
ON BAI_VIET_DANH_MUC(IDBaiViet)
WHERE LaDanhMucChinh = 1;
GO

CREATE TABLE BAI_VIET_VUNG_VAN_HOA
(
    IDBaiViet                   BIGINT NOT NULL,
    IDVung                      BIGINT NOT NULL,
    LoaiLienHe                  VARCHAR(20) NOT NULL DEFAULT 'LIEN_QUAN'
                                CHECK (LoaiLienHe IN ('NGUON_GOC','THUC_HANH','PHO_BIEN','LIEN_QUAN')),
    PRIMARY KEY (IDBaiViet, IDVung),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDVung) REFERENCES VUNG_VAN_HOA(IDVung)
);
GO

CREATE TABLE BAI_VIET_DAN_TOC
(
    IDBaiViet                   BIGINT NOT NULL,
    IDDanToc                    BIGINT NOT NULL,
    LoaiLienHe                  VARCHAR(20) NOT NULL DEFAULT 'LIEN_QUAN'
                                CHECK (LoaiLienHe IN ('NGUON_GOC','THUC_HANH','LIEN_QUAN')),
    PRIMARY KEY (IDBaiViet, IDDanToc),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDDanToc) REFERENCES DAN_TOC(IDDanToc)
);
GO

CREATE TABLE BAI_VIET_THE
(
    IDBaiViet                   BIGINT NOT NULL,
    IDThe                       BIGINT NOT NULL,
    PRIMARY KEY (IDBaiViet, IDThe),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDThe) REFERENCES THE_NOI_DUNG(IDThe)
);
GO

CREATE TABLE BAI_VIET_TU_KHOA
(
    IDBaiViet                   BIGINT NOT NULL,
    IDTuKhoa                    BIGINT NOT NULL,
    PRIMARY KEY (IDBaiViet, IDTuKhoa),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDTuKhoa) REFERENCES TU_KHOA(IDTuKhoa)
);
GO

CREATE TABLE BAI_VIET_LIEN_QUAN
(
    IDBaiViet                   BIGINT NOT NULL,
    IDBaiVietLienQuan           BIGINT NOT NULL,
    LoaiLienKet                 VARCHAR(20) NOT NULL DEFAULT 'LIEN_QUAN'
                                CHECK (LoaiLienKet IN ('LIEN_QUAN','CUNG_CHU_DE','CUNG_VUNG','CUNG_DAN_TOC','GOI_Y')),
    TrongSo                     DECIMAL(5,2) NOT NULL DEFAULT 1.00,
    PRIMARY KEY (IDBaiViet, IDBaiVietLienQuan, LoaiLienKet),
    CHECK (IDBaiViet <> IDBaiVietLienQuan),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDBaiVietLienQuan) REFERENCES BAI_VIET(IDBaiViet)
);
GO

/* =========================================================
   5. MEDIA
   ========================================================= */
CREATE TABLE MEDIA
(
    IDMedia                     BIGINT IDENTITY(1,1) PRIMARY KEY,
    LoaiMedia                   VARCHAR(20) NOT NULL
                                CHECK (LoaiMedia IN ('HINH_ANH','VIDEO','AM_THANH','TAI_LIEU')),
    TenTep                      NVARCHAR(255) NOT NULL,
    DuongDanTep                 NVARCHAR(1000) NOT NULL,
    NhaCungCapLuuTru            NVARCHAR(100) NULL,
    MimeType                    NVARCHAR(100) NULL,
    KichThuocBytes              BIGINT NULL CHECK (KichThuocBytes IS NULL OR KichThuocBytes >= 0),
    RongPx                      INT NULL CHECK (RongPx IS NULL OR RongPx >= 0),
    CaoPx                       INT NULL CHECK (CaoPx IS NULL OR CaoPx >= 0),
    ThoiLuongGiay               INT NULL CHECK (ThoiLuongGiay IS NULL OR ThoiLuongGiay >= 0),
    ChuSoHuuBanQuyen            NVARCHAR(255) NULL,
    ThongTinGiayPhep            NVARCHAR(255) NULL,
    TrangThai                   VARCHAR(20) NOT NULL DEFAULT 'NHAP'
                                CHECK (TrangThai IN ('NHAP','HOAT_DONG','TU_CHOI','LUU_TRU')),
    IDNguoiTaiLen               BIGINT NOT NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    NgayCapNhat                 DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    RowVer                      ROWVERSION,
    FOREIGN KEY (IDNguoiTaiLen) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

CREATE TABLE MEDIA_BAN_DICH
(
    IDMedia                     BIGINT NOT NULL,
    MaNgonNgu                   VARCHAR(10) NOT NULL,
    VanBanThayThe               NVARCHAR(500) NULL,
    ChuThich                    NVARCHAR(1000) NULL,
    PRIMARY KEY (IDMedia, MaNgonNgu),
    FOREIGN KEY (IDMedia) REFERENCES MEDIA(IDMedia),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE BAI_VIET_MEDIA
(
    IDBaiViet                   BIGINT NOT NULL,
    IDMedia                     BIGINT NOT NULL,
    ThuTuHienThi                INT NOT NULL DEFAULT 0,
    LaMediaChinh                BIT NOT NULL DEFAULT 0,
    NguCanhSuDung               VARCHAR(20) NOT NULL DEFAULT 'BO_SUU_TAP'
                                CHECK (NguCanhSuDung IN ('ANH_BIA','BO_SUU_TAP','CHEN_NOI_DUNG','THAM_KHAO')),
    PRIMARY KEY (IDBaiViet, IDMedia),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDMedia) REFERENCES MEDIA(IDMedia)
);
GO

CREATE UNIQUE INDEX UX_BAI_VIET_MEDIA_CHINH
ON BAI_VIET_MEDIA(IDBaiViet)
WHERE LaMediaChinh = 1;
GO

CREATE TABLE MEDIA_VUNG_VAN_HOA
(
    IDMedia                     BIGINT NOT NULL,
    IDVung                      BIGINT NOT NULL,
    ThuTuHienThi                INT NOT NULL DEFAULT 0,
    PRIMARY KEY (IDMedia, IDVung),
    FOREIGN KEY (IDMedia) REFERENCES MEDIA(IDMedia),
    FOREIGN KEY (IDVung) REFERENCES VUNG_VAN_HOA(IDVung)
);
GO

CREATE TABLE MEDIA_DAN_TOC
(
    IDMedia                     BIGINT NOT NULL,
    IDDanToc                    BIGINT NOT NULL,
    ThuTuHienThi                INT NOT NULL DEFAULT 0,
    PRIMARY KEY (IDMedia, IDDanToc),
    FOREIGN KEY (IDMedia) REFERENCES MEDIA(IDMedia),
    FOREIGN KEY (IDDanToc) REFERENCES DAN_TOC(IDDanToc)
);
GO

/* =========================================================
   6. NGUON THAM KHAO
   ========================================================= */
CREATE TABLE NGUON_THAM_KHAO
(
    IDNguon                     BIGINT IDENTITY(1,1) PRIMARY KEY,
    LoaiNguon                   VARCHAR(30) NOT NULL
                                CHECK (LoaiNguon IN ('SACH','BAI_BAO','TAP_CHI','WEBSITE','PHONG_VAN','LUU_TRU','VIDEO','TAI_LIEU_NHA_NUOC','KHAC')),
    TieuDeNguon                 NVARCHAR(500) NOT NULL,
    TacGia                      NVARCHAR(300) NULL,
    NhaXuatBan                  NVARCHAR(300) NULL,
    NamXuatBan                  SMALLINT NULL CHECK (NamXuatBan IS NULL OR NamXuatBan BETWEEN 1000 AND 2100),
    URLNguon                    NVARCHAR(1000) NULL,
    ISBN                        NVARCHAR(50) NULL,
    DOI                         NVARCHAR(100) NULL,
    MaNgonNguNguon              VARCHAR(10) NULL,
    GhiChu                      NVARCHAR(1000) NULL,
    MucDoTinCay                 TINYINT NOT NULL DEFAULT 3 CHECK (MucDoTinCay BETWEEN 1 AND 5),
    DaXacMinh                   BIT NOT NULL DEFAULT 0,
    IDNguoiXacMinh              BIGINT NULL,
    NgayXacMinh                 DATETIME2(0) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (MaNgonNguNguon) REFERENCES NGON_NGU(MaNgonNgu),
    FOREIGN KEY (IDNguoiXacMinh) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

CREATE TABLE BAI_VIET_NGUON_THAM_KHAO
(
    IDBaiViet                   BIGINT NOT NULL,
    IDNguon                     BIGINT NOT NULL,
    GhiChuTrichDan              NVARCHAR(500) NULL,
    TrangTu                     INT NULL,
    TrangDen                    INT NULL,
    LaNguonChinh                BIT NOT NULL DEFAULT 0,
    PRIMARY KEY (IDBaiViet, IDNguon),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDNguon) REFERENCES NGUON_THAM_KHAO(IDNguon)
);
GO

/* =========================================================
   7. PHIEN BAN - LICH SU TRANG THAI
   ========================================================= */
CREATE TABLE PHIEN_BAN_BAI_VIET
(
    IDPhienBan                  BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDBaiViet                   BIGINT NOT NULL,
    SoPhienBan                  INT NOT NULL,
    LoaiThayDoi                 VARCHAR(20) NOT NULL
                                CHECK (LoaiThayDoi IN ('TAO_MOI','CAP_NHAT','GUI_DUYET','DUYET','XUAT_BAN','AN','LUU_TRU','TU_CHOI','PHUC_HOI','CAP_NHAT_BAN_DICH','CAP_NHAT_METADATA')),
    TomTatThayDoi               NVARCHAR(500) NULL,
    DuLieuSnapshotJson          NVARCHAR(MAX) NOT NULL,
    TrangThaiPhienBan           VARCHAR(20) NOT NULL
                                CHECK (TrangThaiPhienBan IN ('NHAP','CHO_DUYET','DA_DUYET','TU_CHOI','DA_XUAT_BAN','AN','LUU_TRU')),
    IDNguoiGuiDuyet             BIGINT NULL,
    NgayGuiDuyet                DATETIME2(0) NULL,
    IDNguoiDuyet                BIGINT NULL,
    NgayDuyet                   DATETIME2(0) NULL,
    IDNguoiXuatBan              BIGINT NULL,
    NgayXuatBan                 DATETIME2(0) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    UNIQUE (IDBaiViet, SoPhienBan),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDNguoiGuiDuyet) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDNguoiDuyet) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDNguoiXuatBan) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

ALTER TABLE BAI_VIET
ADD CONSTRAINT FK_BAI_VIET_PHIEN_BAN_HIEN_TAI
FOREIGN KEY (IDPhienBanXuatBanHienTai) REFERENCES PHIEN_BAN_BAI_VIET(IDPhienBan);
GO

CREATE TABLE LICH_SU_TRANG_THAI_BAI_VIET
(
    IDLichSu                    BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDBaiViet                   BIGINT NOT NULL,
    TrangThaiCu                 VARCHAR(20) NULL,
    TrangThaiMoi                VARCHAR(20) NOT NULL,
    IDNguoiThayDoi              BIGINT NULL,
    GhiChu                      NVARCHAR(1000) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDNguoiThayDoi) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

/* =========================================================
   8. PHIEN NGUOI DUNG - TIM KIEM - XEM BAI VIET
   ========================================================= */
CREATE TABLE PHIEN_NGUOI_DUNG
(
    IDPhien                     UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    LoaiPhien                   VARCHAR(20) NOT NULL DEFAULT 'KHACH'
                                CHECK (LoaiPhien IN ('KHACH','DA_DANG_NHAP')),
    MaNgonNguUuTien             VARCHAR(10) NULL,
    MaQuocGiaNguoiDung          CHAR(2) NULL,
    LoaiThietBi                 NVARCHAR(50) NULL,
    ThongTinTrinhDuyet          NVARCHAR(255) NULL,
    URLGioiThieu                NVARCHAR(1000) NULL,
    DongYPhanTich               BIT NOT NULL DEFAULT 1,
    BatDauLuc                   DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    KetThucLuc                  DATETIME2(0) NULL,
    FOREIGN KEY (MaNgonNguUuTien) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE NHAT_KY_TIM_KIEM
(
    IDTimKiem                   BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDPhien                     UNIQUEIDENTIFIER NULL,
    TuKhoaTimKiem               NVARCHAR(300) NOT NULL,
    MaNgonNgu                   VARCHAR(10) NULL,
    KieuTimKiem                 VARCHAR(20) NOT NULL
                                CHECK (KieuTimKiem IN ('TU_KHOA','NGU_NGHIA','KET_HOP')),
    SoKetQua                    INT NOT NULL DEFAULT 0,
    CoKetQuaPhuHop              BIT NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDPhien) REFERENCES PHIEN_NGUOI_DUNG(IDPhien),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE NHAT_KY_XEM_BAI_VIET
(
    IDXemBai                    BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDPhien                     UNIQUEIDENTIFIER NULL,
    IDBaiViet                   BIGINT NOT NULL,
    MaNgonNgu                   VARCHAR(10) NULL,
    ThoiDiemXem                 DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    SoGiayXem                   INT NULL CHECK (SoGiayXem IS NULL OR SoGiayXem >= 0),
    NguonTruyCap                VARCHAR(20) NOT NULL DEFAULT 'TRUC_TIEP'
                                CHECK (NguonTruyCap IN ('TRUC_TIEP','TIM_KIEM','BAN_DO','GOI_Y','AI')),
    FOREIGN KEY (IDPhien) REFERENCES PHIEN_NGUOI_DUNG(IDPhien),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

/* =========================================================
   9. AI CHAT - RAG - DONG BO TRI THUC
   ========================================================= */
CREATE TABLE PHIEN_CHAT_AI
(
    IDPhienChat                 UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    IDPhienNguoiDung            UNIQUEIDENTIFIER NULL,
    MaNgonNguPhien              VARCHAR(10) NULL,
    MaQuocGiaNguoiDung          CHAR(2) NULL,
    TieuDeHoiThoai              NVARCHAR(255) NULL,
    BatDauLuc                   DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    KetThucLuc                  DATETIME2(0) NULL,
    FOREIGN KEY (IDPhienNguoiDung) REFERENCES PHIEN_NGUOI_DUNG(IDPhien),
    FOREIGN KEY (MaNgonNguPhien) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE TIN_NHAN_CHAT_AI
(
    IDTinNhan                   BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDPhienChat                 UNIQUEIDENTIFIER NOT NULL,
    LoaiNguoiGui                VARCHAR(20) NOT NULL
                                CHECK (LoaiNguoiGui IN ('NGUOI_DUNG','AI','HE_THONG')),
    ThuTuTinNhan                INT NOT NULL,
    MaNgonNgu                   VARCHAR(10) NULL,
    NoiDungTinNhan              NVARCHAR(MAX) NOT NULL,
    MaYDinh                     VARCHAR(50) NULL,
    DiemTinCay                  DECIMAL(5,4) NULL,
    TraLoiTot                   BIT NULL,
    NgoaiPhamVi                 BIT NOT NULL DEFAULT 0,
    LaNoiDungNhayCam            BIT NOT NULL DEFAULT 0,
    DuCanCuDuLieu               BIT NOT NULL DEFAULT 1,
    ThoiGianPhanHoiMs           INT NULL CHECK (ThoiGianPhanHoiMs IS NULL OR ThoiGianPhanHoiMs >= 0),
    SoPromptToken               INT NULL CHECK (SoPromptToken IS NULL OR SoPromptToken >= 0),
    SoCompletionToken           INT NULL CHECK (SoCompletionToken IS NULL OR SoCompletionToken >= 0),
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    UNIQUE (IDPhienChat, ThuTuTinNhan),
    FOREIGN KEY (IDPhienChat) REFERENCES PHIEN_CHAT_AI(IDPhienChat),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE CAU_HOI_CAN_BO_SUNG
(
    IDCauHoiCanBoSung           BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDTinNhan                   BIGINT NOT NULL,
    LyDo                        VARCHAR(30) NOT NULL
                                CHECK (LyDo IN ('THIEU_DU_LIEU','DO_TIN_CAY_THAP','MAU_THUAN_DU_LIEU','NGOAI_PHAM_VI','NHAY_CAM')),
    GoiYXuLy                    NVARCHAR(500) NULL,
    TrangThai                   VARCHAR(20) NOT NULL DEFAULT 'MOI'
                                CHECK (TrangThai IN ('MOI','DANG_XEM_XET','DA_XU_LY','BO_QUA')),
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    NgayXuLy                    DATETIME2(0) NULL,
    FOREIGN KEY (IDTinNhan) REFERENCES TIN_NHAN_CHAT_AI(IDTinNhan)
);
GO

CREATE TABLE DOT_DONG_BO_TRI_THUC_AI
(
    IDDotDongBo                 BIGINT IDENTITY(1,1) PRIMARY KEY,
    LoaiDongBo                  VARCHAR(30) NOT NULL
                                CHECK (LoaiDongBo IN ('TOAN_BO','TANG_DAN','XAY_LAI_VECTOR')),
    TrangThai                   VARCHAR(20) NOT NULL
                                CHECK (TrangThai IN ('CHO_XU_LY','DANG_CHAY','THANH_CONG','THAT_BAI','MOT_PHAN')),
    BatDauLuc                   DATETIME2(0) NULL,
    KetThucLuc                  DATETIME2(0) NULL,
    IDNguoiKichHoat             BIGINT NULL,
    ThongBaoLoi                 NVARCHAR(MAX) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDNguoiKichHoat) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

CREATE TABLE CHI_TIET_DONG_BO_TRI_THUC_AI
(
    IDChiTietDongBo             BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDDotDongBo                 BIGINT NOT NULL,
    IDBaiViet                   BIGINT NOT NULL,
    TrangThai                   VARCHAR(20) NOT NULL
                                CHECK (TrangThai IN ('CHO_XU_LY','DANG_XU_LY','THANH_CONG','THAT_BAI')),
    SoDoanChunk                 INT NULL CHECK (SoDoanChunk IS NULL OR SoDoanChunk >= 0),
    ThongBaoLoi                 NVARCHAR(MAX) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDDotDongBo) REFERENCES DOT_DONG_BO_TRI_THUC_AI(IDDotDongBo),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet)
);
GO

CREATE TABLE TAI_LIEU_TRI_THUC_AI
(
    IDTaiLieuTriThuc            BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDBaiViet                   BIGINT NOT NULL,
    MaNgonNgu                   VARCHAR(10) NOT NULL,
    IDPhienBan                  BIGINT NULL,
    TieuDeTaiLieu               NVARCHAR(300) NOT NULL,
    MetadataJson                NVARCHAR(MAX) NULL,
    HoatDong                    BIT NOT NULL DEFAULT 1,
    NhaCungCapEmbedding         NVARCHAR(100) NULL,
    NgayEmbedding               DATETIME2(0) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu),
    FOREIGN KEY (IDPhienBan) REFERENCES PHIEN_BAN_BAI_VIET(IDPhienBan)
);
GO

CREATE TABLE DOAN_TRI_THUC_AI
(
    IDDoan                      BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDTaiLieuTriThuc            BIGINT NOT NULL,
    SoThuTuDoan                 INT NOT NULL,
    NoiDungDoan                 NVARCHAR(MAX) NOT NULL,
    SoToken                     INT NULL CHECK (SoToken IS NULL OR SoToken >= 0),
    KhoaEmbedding               NVARCHAR(255) NULL,
    MetadataJson                NVARCHAR(MAX) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    UNIQUE (IDTaiLieuTriThuc, SoThuTuDoan),
    FOREIGN KEY (IDTaiLieuTriThuc) REFERENCES TAI_LIEU_TRI_THUC_AI(IDTaiLieuTriThuc)
);
GO

CREATE TABLE TRICH_DAN_TIN_NHAN_AI
(
    IDTrichDan                  BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDTinNhan                   BIGINT NOT NULL,
    IDTaiLieuTriThuc            BIGINT NOT NULL,
    IDDoan                      BIGINT NULL,
    ThuTuTrichDan               INT NOT NULL DEFAULT 1,
    DoanTrichYeu                NVARCHAR(1000) NULL,
    FOREIGN KEY (IDTinNhan) REFERENCES TIN_NHAN_CHAT_AI(IDTinNhan),
    FOREIGN KEY (IDTaiLieuTriThuc) REFERENCES TAI_LIEU_TRI_THUC_AI(IDTaiLieuTriThuc),
    FOREIGN KEY (IDDoan) REFERENCES DOAN_TRI_THUC_AI(IDDoan)
);
GO

/* =========================================================
   10. PHAN HOI NGUOI DUNG
   ========================================================= */
CREATE TABLE PHAN_HOI_NOI_DUNG
(
    IDPhanHoi                   BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDPhien                     UNIQUEIDENTIFIER NULL,
    LoaiPhanHoi                 VARCHAR(20) NOT NULL
                                CHECK (LoaiPhanHoi IN ('BAI_VIET','TRA_LOI_AI','CHUNG')),
    IDBaiViet                   BIGINT NULL,
    IDTinNhan                   BIGINT NULL,
    DiemDanhGia                 TINYINT NULL CHECK (DiemDanhGia BETWEEN 1 AND 5),
    HuuIch                      BIT NULL,
    NoiDungPhanHoi              NVARCHAR(2000) NULL,
    TrangThaiXuLy               VARCHAR(20) NOT NULL DEFAULT 'MOI'
                                CHECK (TrangThaiXuLy IN ('MOI','DA_XEM','DA_XU_LY','TU_CHOI')),
    IDNguoiXuLy                 BIGINT NULL,
    NgayXuLy                    DATETIME2(0) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDPhien) REFERENCES PHIEN_NGUOI_DUNG(IDPhien),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDTinNhan) REFERENCES TIN_NHAN_CHAT_AI(IDTinNhan),
    FOREIGN KEY (IDNguoiXuLy) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    CHECK (
        (LoaiPhanHoi = 'BAI_VIET' AND IDBaiViet IS NOT NULL)
        OR
        (LoaiPhanHoi = 'TRA_LOI_AI' AND IDTinNhan IS NOT NULL)
        OR
        (LoaiPhanHoi = 'CHUNG')
    )
);
GO

/* =========================================================
   11. NHAT KY QUAN TRI
   ========================================================= */
CREATE TABLE NHAT_KY_QUAN_TRI
(
    IDNhatKy                    BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDNguoiDung                 BIGINT NOT NULL,
    LoaiHanhDong                VARCHAR(50) NOT NULL,
    TenThucThe                  VARCHAR(100) NOT NULL,
    GiaTriKhoa                  NVARCHAR(100) NOT NULL,
    DuLieuCuJson                NVARCHAR(MAX) NULL,
    DuLieuMoiJson               NVARCHAR(MAX) NULL,
    GhiChu                      NVARCHAR(1000) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDNguoiDung) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

/* =========================================================
   12. INDEX
   ========================================================= */
CREATE INDEX IX_BAI_VIET_TrangThai ON BAI_VIET(TrangThai);
GO
CREATE INDEX IX_BAI_VIET_TrangThaiDongBoAI ON BAI_VIET(TrangThaiDongBoAI);
GO
CREATE INDEX IX_BAI_VIET_NgayTao ON BAI_VIET(NgayTao);
GO
CREATE INDEX IX_BAI_VIET_BAN_DICH_IDBaiViet_MaNgonNgu ON BAI_VIET_BAN_DICH(IDBaiViet, MaNgonNgu);
GO
CREATE INDEX IX_BAI_VIET_DANH_MUC_IDDanhMuc ON BAI_VIET_DANH_MUC(IDDanhMuc);
GO
CREATE INDEX IX_BAI_VIET_VUNG_VAN_HOA_IDVung ON BAI_VIET_VUNG_VAN_HOA(IDVung);
GO
CREATE INDEX IX_BAI_VIET_DAN_TOC_IDDanToc ON BAI_VIET_DAN_TOC(IDDanToc);
GO
CREATE INDEX IX_BAI_VIET_THE_IDThe ON BAI_VIET_THE(IDThe);
GO
CREATE INDEX IX_BAI_VIET_TU_KHOA_IDTuKhoa ON BAI_VIET_TU_KHOA(IDTuKhoa);
GO
CREATE INDEX IX_BAI_VIET_NGUON_IDNguon ON BAI_VIET_NGUON_THAM_KHAO(IDNguon);
GO
CREATE INDEX IX_BAI_VIET_LIEN_QUAN_IDBaiVietLienQuan ON BAI_VIET_LIEN_QUAN(IDBaiVietLienQuan);
GO
CREATE INDEX IX_BAI_VIET_MEDIA_IDMedia ON BAI_VIET_MEDIA(IDMedia);
GO
CREATE INDEX IX_MEDIA_VUNG_VAN_HOA_IDVung ON MEDIA_VUNG_VAN_HOA(IDVung);
GO
CREATE INDEX IX_MEDIA_DAN_TOC_IDDanToc ON MEDIA_DAN_TOC(IDDanToc);
GO
CREATE UNIQUE INDEX UX_NGON_NGU_MAC_DINH ON NGON_NGU(LaMacDinh) WHERE LaMacDinh = 1;
GO
CREATE INDEX IX_TAI_LIEU_TRI_THUC_AI_IDBaiViet_MaNgonNgu ON TAI_LIEU_TRI_THUC_AI(IDBaiViet, MaNgonNgu);
GO
CREATE INDEX IX_MEDIA_TrangThai ON MEDIA(TrangThai);
GO
CREATE INDEX IX_PHIEN_BAN_BAI_VIET_IDBaiViet ON PHIEN_BAN_BAI_VIET(IDBaiViet, SoPhienBan DESC);
GO
CREATE INDEX IX_LICH_SU_TRANG_THAI_BAI_VIET_IDBaiViet ON LICH_SU_TRANG_THAI_BAI_VIET(IDBaiViet, NgayTao DESC);
GO
CREATE INDEX IX_NHAT_KY_TIM_KIEM_NgayTao ON NHAT_KY_TIM_KIEM(NgayTao);
GO
CREATE INDEX IX_NHAT_KY_XEM_BAI_VIET_ThoiDiemXem ON NHAT_KY_XEM_BAI_VIET(ThoiDiemXem);
GO
CREATE INDEX IX_TIN_NHAN_CHAT_AI_IDPhienChat ON TIN_NHAN_CHAT_AI(IDPhienChat, ThuTuTinNhan);
GO
CREATE INDEX IX_CAU_HOI_CAN_BO_SUNG_TrangThai ON CAU_HOI_CAN_BO_SUNG(TrangThai, NgayTao);
GO
CREATE INDEX IX_PHAN_HOI_NOI_DUNG_TrangThaiXuLy ON PHAN_HOI_NOI_DUNG(TrangThaiXuLy, NgayTao);
GO
CREATE INDEX IX_CHI_TIET_DONG_BO_AI_IDBaiViet ON CHI_TIET_DONG_BO_TRI_THUC_AI(IDBaiViet, NgayTao);
GO
CREATE INDEX IX_DOAN_TRI_THUC_AI_IDTaiLieuTriThuc ON DOAN_TRI_THUC_AI(IDTaiLieuTriThuc, SoThuTuDoan);
GO

/* =========================================================
   13. HAM TAO SNAPSHOT JSON CHO PHIEN BAN
   ========================================================= */
CREATE OR ALTER FUNCTION dbo.FN_SNAPSHOT_BAI_VIET
(
    @IDBaiViet BIGINT
)
RETURNS NVARCHAR(MAX)
AS
BEGIN
    DECLARE @Json NVARCHAR(MAX);

    SELECT @Json =
    (
        SELECT
            b.IDBaiViet,
            b.DuongDanSeo,
            b.MaNgonNguGoc,
            b.LoaiBaiViet,
            b.TrangThai,
            b.CapDoNhayCam,
            b.MucDoKiemDuyet,
            b.NoiDungNoiBat,
            b.TrangThaiDongBoAI,
            b.NgayDuyet,
            b.NgayXuatBan,
            b.IDNguoiTao,
            b.IDNguoiCapNhat,
            b.NgayTao,
            b.NgayCapNhat,
            JSON_QUERY((
                SELECT
                    bd.IDBanDich,
                    bd.MaNgonNgu,
                    bd.TieuDe,
                    bd.TomTat,
                    bd.GioiThieu,
                    bd.NguonGoc,
                    bd.YNghiaVanHoa,
                    bd.BoiCanhSuDung,
                    bd.NoiDungChiTiet,
                    bd.GhiChuCultureShock,
                    bd.TrangThaiBanDich,
                    bd.LaBanDichMay,
                    bd.IDNguoiSoat,
                    bd.NgaySoat
                FROM BAI_VIET_BAN_DICH bd
                WHERE bd.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS DanhSachBanDich,
            JSON_QUERY((
                SELECT IDDanhMuc, LaDanhMucChinh
                FROM BAI_VIET_DANH_MUC x
                WHERE x.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS DanhMuc,
            JSON_QUERY((
                SELECT IDVung, LoaiLienHe
                FROM BAI_VIET_VUNG_VAN_HOA x
                WHERE x.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS VungVanHoa,
            JSON_QUERY((
                SELECT IDDanToc, LoaiLienHe
                FROM BAI_VIET_DAN_TOC x
                WHERE x.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS DanToc,
            JSON_QUERY((
                SELECT IDThe
                FROM BAI_VIET_THE x
                WHERE x.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS TheNoiDung,
            JSON_QUERY((
                SELECT IDTuKhoa
                FROM BAI_VIET_TU_KHOA x
                WHERE x.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS TuKhoa,
            JSON_QUERY((
                SELECT IDNguon, LaNguonChinh, GhiChuTrichDan, TrangTu, TrangDen
                FROM BAI_VIET_NGUON_THAM_KHAO x
                WHERE x.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS NguonThamKhao,
            JSON_QUERY((
                SELECT IDMedia, ThuTuHienThi, LaMediaChinh, NguCanhSuDung
                FROM BAI_VIET_MEDIA x
                WHERE x.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS Media
        FROM BAI_VIET b
        WHERE b.IDBaiViet = @IDBaiViet
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    );

    RETURN @Json;
END;
GO

/* =========================================================
   14. VALIDATE BAN DICH DUOC SOAT
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_BAI_VIET_BAN_DICH_VALIDATE_SOAT
ON BAI_VIET_BAN_DICH
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThaiBanDich IN ('DA_SOAT','DA_DUYET','DA_XUAT_BAN')
          AND (i.IDNguoiSoat IS NULL OR i.NgaySoat IS NULL)
    )
    BEGIN
        RAISERROR(N'Ban dich o trang thai da soat/da duyet/xuat ban phai co nguoi soat va ngay soat.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThaiBanDich IN ('DA_DUYET','DA_XUAT_BAN')
          AND (
                LEN(LTRIM(RTRIM(ISNULL(i.TieuDe, N'')))) = 0
                OR LEN(LTRIM(RTRIM(ISNULL(i.NoiDungChiTiet, N'')))) = 0
              )
    )
    BEGIN
        RAISERROR(N'Ban dich da duyet/xuat ban phai co tieu de va noi dung chi tiet.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;
END;
GO

/* =========================================================
   15. TRIGGER SET NgayCapNhat
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_QUAN_TRI_NGUOI_DUNG_SET_NGAYCAPNHAT
ON QUAN_TRI_NGUOI_DUNG
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    UPDATE u
    SET NgayCapNhat = SYSUTCDATETIME()
    FROM QUAN_TRI_NGUOI_DUNG u
    INNER JOIN inserted i ON u.IDNguoiDung = i.IDNguoiDung;
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_SET_NGAYCAPNHAT
ON BAI_VIET
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    UPDATE b
    SET
        NgayCapNhat = SYSUTCDATETIME(),
        MucDoKiemDuyet = CASE WHEN b.CapDoNhayCam >= 4 THEN 'CHAT' ELSE b.MucDoKiemDuyet END
    FROM BAI_VIET b
    INNER JOIN inserted i ON b.IDBaiViet = i.IDBaiViet;
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_BAN_DICH_SET_NGAYCAPNHAT
ON BAI_VIET_BAN_DICH
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    UPDATE bd
    SET NgayCapNhat = SYSUTCDATETIME()
    FROM BAI_VIET_BAN_DICH bd
    INNER JOIN inserted i ON bd.IDBanDich = i.IDBanDich;
END;
GO

CREATE OR ALTER TRIGGER TRG_MEDIA_SET_NGAYCAPNHAT
ON MEDIA
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    UPDATE m
    SET NgayCapNhat = SYSUTCDATETIME()
    FROM MEDIA m
    INNER JOIN inserted i ON m.IDMedia = i.IDMedia;
END;
GO

/* =========================================================
   16. TRIGGER LUU LICH SU TRANG THAI
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_BAI_VIET_LUU_LICH_SU_TRANG_THAI
ON BAI_VIET
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    INSERT INTO LICH_SU_TRANG_THAI_BAI_VIET
    (
        IDBaiViet,
        TrangThaiCu,
        TrangThaiMoi,
        IDNguoiThayDoi,
        GhiChu
    )
    SELECT
        i.IDBaiViet,
        d.TrangThai,
        i.TrangThai,
        COALESCE(i.IDNguoiCapNhat, i.IDNguoiTao),
        NULL
    FROM inserted i
    LEFT JOIN deleted d
        ON i.IDBaiViet = d.IDBaiViet
    WHERE d.IDBaiViet IS NULL
       OR ISNULL(d.TrangThai, '') <> ISNULL(i.TrangThai, '');
END;
GO

/* =========================================================
   17. TRIGGER TAO PHIEN BAN
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_BAI_VIET_TAO_PHIEN_BAN
ON BAI_VIET
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    INSERT INTO PHIEN_BAN_BAI_VIET
    (
        IDBaiViet,
        SoPhienBan,
        LoaiThayDoi,
        TomTatThayDoi,
        DuLieuSnapshotJson,
        TrangThaiPhienBan,
        IDNguoiGuiDuyet,
        NgayGuiDuyet,
        IDNguoiDuyet,
        NgayDuyet,
        IDNguoiXuatBan,
        NgayXuatBan
    )
    SELECT
        i.IDBaiViet,
        ISNULL((SELECT MAX(v.SoPhienBan) FROM PHIEN_BAN_BAI_VIET v WHERE v.IDBaiViet = i.IDBaiViet), 0) + 1,
        CASE
            WHEN d.IDBaiViet IS NULL THEN 'TAO_MOI'
            WHEN d.TrangThai <> i.TrangThai AND i.TrangThai = 'CHO_DUYET' THEN 'GUI_DUYET'
            WHEN d.TrangThai <> i.TrangThai AND i.TrangThai = 'DA_DUYET' THEN 'DUYET'
            WHEN d.TrangThai <> i.TrangThai AND i.TrangThai = 'DA_XUAT_BAN' THEN 'XUAT_BAN'
            WHEN d.TrangThai <> i.TrangThai AND i.TrangThai = 'AN' THEN 'AN'
            WHEN d.TrangThai <> i.TrangThai AND i.TrangThai = 'LUU_TRU' THEN 'LUU_TRU'
            WHEN d.TrangThai <> i.TrangThai AND i.TrangThai = 'TU_CHOI' THEN 'TU_CHOI'
            ELSE 'CAP_NHAT'
        END,
        NULL,
        dbo.FN_SNAPSHOT_BAI_VIET(i.IDBaiViet),
        CASE
            WHEN i.TrangThai = 'NHAP' THEN 'NHAP'
            WHEN i.TrangThai = 'CHO_DUYET' THEN 'CHO_DUYET'
            WHEN i.TrangThai = 'DA_DUYET' THEN 'DA_DUYET'
            WHEN i.TrangThai = 'DA_XUAT_BAN' THEN 'DA_XUAT_BAN'
            WHEN i.TrangThai = 'AN' THEN 'AN'
            WHEN i.TrangThai = 'LUU_TRU' THEN 'LUU_TRU'
            ELSE 'TU_CHOI'
        END,
        CASE WHEN i.TrangThai = 'CHO_DUYET' THEN COALESCE(i.IDNguoiCapNhat, i.IDNguoiTao) END,
        CASE WHEN i.TrangThai = 'CHO_DUYET' THEN SYSUTCDATETIME() END,
        i.IDNguoiDuyet,
        i.NgayDuyet,
        i.IDNguoiXuatBan,
        i.NgayXuatBan
    FROM inserted i
    LEFT JOIN deleted d ON i.IDBaiViet = d.IDBaiViet;
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_BAN_DICH_TAO_PHIEN_BAN
ON BAI_VIET_BAN_DICH
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    INSERT INTO PHIEN_BAN_BAI_VIET
    (
        IDBaiViet,
        SoPhienBan,
        LoaiThayDoi,
        TomTatThayDoi,
        DuLieuSnapshotJson,
        TrangThaiPhienBan
    )
    SELECT
        c.IDBaiViet,
        ISNULL((SELECT MAX(v.SoPhienBan) FROM PHIEN_BAN_BAI_VIET v WHERE v.IDBaiViet = c.IDBaiViet), 0) + 1,
        'CAP_NHAT_BAN_DICH',
        N'Cap nhat ban dich bai viet',
        dbo.FN_SNAPSHOT_BAI_VIET(c.IDBaiViet),
        CASE b.TrangThai
            WHEN 'NHAP' THEN 'NHAP'
            WHEN 'CHO_DUYET' THEN 'CHO_DUYET'
            WHEN 'DA_DUYET' THEN 'DA_DUYET'
            WHEN 'DA_XUAT_BAN' THEN 'DA_XUAT_BAN'
            WHEN 'AN' THEN 'AN'
            WHEN 'LUU_TRU' THEN 'LUU_TRU'
            ELSE 'TU_CHOI'
        END
    FROM CTE c
    INNER JOIN BAI_VIET b ON b.IDBaiViet = c.IDBaiViet;
END;
GO

/* =========================================================
   18. TRIGGER VALIDATE XUAT BAN
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_BAI_VIET_VALIDATE_XUAT_BAN
ON BAI_VIET
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND (i.IDNguoiDuyet IS NULL OR i.NgayDuyet IS NULL OR i.IDNguoiXuatBan IS NULL OR i.NgayXuatBan IS NULL)
    )
    BEGIN
        RAISERROR(N'Bai viet xuat ban phai co thong tin duyet va xuat ban.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND NOT EXISTS (
                SELECT 1 FROM BAI_VIET_DANH_MUC x WHERE x.IDBaiViet = i.IDBaiViet
          )
    )
    BEGIN
        RAISERROR(N'Moi bai viet xuat ban phai thuoc it nhat mot danh muc.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND NOT EXISTS (
                SELECT 1 FROM BAI_VIET_VUNG_VAN_HOA x WHERE x.IDBaiViet = i.IDBaiViet
                UNION ALL
                SELECT 1 FROM BAI_VIET_DAN_TOC y WHERE y.IDBaiViet = i.IDBaiViet
          )
    )
    BEGIN
        RAISERROR(N'Bai viet xuat ban phai gan it nhat mot vung van hoa hoac mot dan toc.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND NOT EXISTS (
                SELECT 1
                FROM BAI_VIET_BAN_DICH bd
                WHERE bd.IDBaiViet = i.IDBaiViet
                  AND bd.MaNgonNgu = 'vi'
                  AND bd.TrangThaiBanDich IN ('DA_DUYET','DA_XUAT_BAN')
          )
    )
    BEGIN
        RAISERROR(N'Bai viet xuat ban phai co ban dich tieng Viet da duyet.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND NOT EXISTS (
                SELECT 1
                FROM BAI_VIET_BAN_DICH bd
                WHERE bd.IDBaiViet = i.IDBaiViet
                  AND bd.MaNgonNgu = 'en'
                  AND bd.TrangThaiBanDich IN ('DA_DUYET','DA_XUAT_BAN')
          )
    )
    BEGIN
        RAISERROR(N'Bai viet xuat ban phai co ban dich tieng Anh da duyet.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND NOT EXISTS (
                SELECT 1
                FROM BAI_VIET_NGUON_THAM_KHAO x
                INNER JOIN NGUON_THAM_KHAO n ON n.IDNguon = x.IDNguon
                WHERE x.IDBaiViet = i.IDBaiViet
                  AND n.DaXacMinh = 1
                  AND n.MucDoTinCay >= 3
          )
    )
    BEGIN
        RAISERROR(N'Bai viet xuat ban phai co it nhat mot nguon tham khao da xac minh va du tin cay.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND EXISTS (
                SELECT 1
                FROM BAI_VIET_BAN_DICH bd
                WHERE bd.IDBaiViet = i.IDBaiViet
                  AND bd.MaNgonNgu IN ('vi','en')
                  AND bd.TrangThaiBanDich IN ('DA_DUYET','DA_XUAT_BAN')
                  AND (bd.IDNguoiSoat IS NULL OR bd.NgaySoat IS NULL)
          )
    )
    BEGIN
        RAISERROR(N'Ban dich duoc duyet/xuat ban phai co thong tin nguoi soat.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND i.CapDoNhayCam >= 4
          AND i.MucDoKiemDuyet <> 'CHAT'
    )
    BEGIN
        RAISERROR(N'Noi dung nhay cam cao phai duoc danh dau muc do kiem duyet CHAT.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;
END;
GO

/* =========================================================
   19. TRIGGER MEDIA ACTIVE PHAI GAN BAI VIET/THUC THE
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_MEDIA_VALIDATE_HOAT_DONG
ON MEDIA
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'HOAT_DONG'
          AND NOT EXISTS (
                SELECT 1 FROM BAI_VIET_MEDIA bm WHERE bm.IDMedia = i.IDMedia
                UNION ALL
                SELECT 1 FROM MEDIA_VUNG_VAN_HOA mv WHERE mv.IDMedia = i.IDMedia
                UNION ALL
                SELECT 1 FROM MEDIA_DAN_TOC md WHERE md.IDMedia = i.IDMedia
          )
    )
    BEGIN
        RAISERROR(N'Media o trang thai HOAT_DONG phai duoc gan voi it nhat mot bai viet hoac thuc the van hoa.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;
END;
GO

/* =========================================================
   20. TRIGGER DANH DAU CAN DONG BO AI KHI SUA NOI DUNG
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_BAI_VIET_BAN_DICH_MARK_SYNC_PENDING
ON BAI_VIET_BAN_DICH
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    UPDATE b
    SET
        CanDongBoAI = 1,
        TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_METADATA_MARK_SYNC_PENDING
ON BAI_VIET
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT (
        UPDATE(DuongDanSeo) OR
        UPDATE(LoaiBaiViet) OR
        UPDATE(CapDoNhayCam) OR
        UPDATE(NoiDungNoiBat) OR
        UPDATE(GhiChuBienTap)
    )
        RETURN;

    UPDATE b
    SET
        CanDongBoAI = 1,
        TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN inserted i ON b.IDBaiViet = i.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_DANH_MUC_MARK_SYNC_PENDING
ON BAI_VIET_DANH_MUC
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    UPDATE b
    SET CanDongBoAI = 1, TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_VUNG_MARK_SYNC_PENDING
ON BAI_VIET_VUNG_VAN_HOA
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    UPDATE b
    SET CanDongBoAI = 1, TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_DAN_TOC_MARK_SYNC_PENDING
ON BAI_VIET_DAN_TOC
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    UPDATE b
    SET CanDongBoAI = 1, TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_THE_MARK_SYNC_PENDING
ON BAI_VIET_THE
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    UPDATE b
    SET CanDongBoAI = 1, TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_NGUON_MARK_SYNC_PENDING
ON BAI_VIET_NGUON_THAM_KHAO
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    UPDATE b
    SET CanDongBoAI = 1, TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_LIEN_QUAN_MARK_SYNC_PENDING
ON BAI_VIET_LIEN_QUAN
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiVietLienQuan FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
        UNION
        SELECT DISTINCT IDBaiVietLienQuan FROM deleted
    )
    UPDATE b
    SET CanDongBoAI = 1, TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_MEDIA_MARK_SYNC_PENDING
ON BAI_VIET_MEDIA
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    UPDATE b
    SET CanDongBoAI = 1, TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_PHIEN_BAN_CAP_NHAT_HIEN_TAI_XUAT_BAN
ON PHIEN_BAN_BAI_VIET
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH LatestPublished AS
    (
        SELECT i.IDBaiViet, MAX(i.IDPhienBan) AS IDPhienBanMoiNhat
        FROM inserted i
        WHERE i.TrangThaiPhienBan = 'DA_XUAT_BAN'
        GROUP BY i.IDBaiViet
    )
    UPDATE b
    SET IDPhienBanXuatBanHienTai = lp.IDPhienBanMoiNhat
    FROM BAI_VIET b
    INNER JOIN LatestPublished lp ON b.IDBaiViet = lp.IDBaiViet;
END;
GO

/* =========================================================
   21. TRIGGER CAP NHAT TRANG THAI AI SAU DONG BO
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_CHI_TIET_DONG_BO_AI_CAP_NHAT_BAI_VIET
ON CHI_TIET_DONG_BO_TRI_THUC_AI
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE b
    SET
        TrangThaiDongBoAI = CASE
            WHEN i.TrangThai = 'THANH_CONG' THEN 'SAN_SANG'
            WHEN i.TrangThai = 'THAT_BAI' THEN 'LOI'
            WHEN i.TrangThai = 'DANG_XU_LY' THEN 'DANG_DONG_BO'
            ELSE b.TrangThaiDongBoAI
        END,
        CanDongBoAI = CASE WHEN i.TrangThai = 'THANH_CONG' THEN 0 ELSE b.CanDongBoAI END
    FROM BAI_VIET b
    INNER JOIN inserted i ON b.IDBaiViet = i.IDBaiViet;
END;
GO

/* =========================================================
   22. DU LIEU MAU CO BAN
   ========================================================= */
INSERT INTO NGON_NGU (MaNgonNgu, TenNgonNgu, TenBanDia, LaMacDinh, HoatDong)
VALUES
('vi', N'Tiếng Việt', N'Tiếng Việt', 1, 1),
('en', N'English', N'English', 0, 1);
GO

INSERT INTO QUAN_TRI_VAI_TRO (MaVaiTro, TenVaiTro, MoTa)
VALUES
('SUPER_ADMIN', N'Quản trị hệ thống', N'Toàn quyền hệ thống'),
('CONTENT_ADMIN', N'Quản trị nội dung', N'Quản lý bài viết, media, danh mục'),
('REVIEWER', N'Kiểm duyệt nội dung', N'Kiểm duyệt nội dung trước khi công khai'),
('AI_ADMIN', N'Quản trị AI', N'Giám sát kho tri thức và pipeline AI'),
('ANALYST', N'Phân tích dữ liệu', N'Xem dashboard và thống kê');
GO

INSERT INTO QUAN_TRI_QUYEN (MaQuyen, TenQuyen, MoTa)
VALUES
('ARTICLE_CREATE', N'Tạo bài viết', N'Thêm mới bài viết'),
('ARTICLE_EDIT', N'Sửa bài viết', N'Chỉnh sửa bài viết'),
('ARTICLE_REVIEW', N'Duyệt bài viết', N'Duyệt hoặc từ chối bài viết'),
('ARTICLE_PUBLISH', N'Xuất bản bài viết', N'Xuất bản hoặc ẩn bài viết'),
('TAXONOMY_MANAGE', N'Quản lý taxonomy', N'Quản lý danh mục, vùng, dân tộc, thẻ, từ khoá'),
('MEDIA_MANAGE', N'Quản lý media', N'Tải lên và gắn media'),
('AI_SYNC_MANAGE', N'Quản lý đồng bộ AI', N'Kích hoạt hoặc giám sát đồng bộ dữ liệu AI'),
('DASHBOARD_VIEW', N'Xem dashboard', N'Xem dashboard và thống kê'),
('FEEDBACK_HANDLE', N'Xử lý phản hồi', N'Xem và xử lý phản hồi người dùng'),
('USER_ROLE_MANAGE', N'Quản lý người dùng và vai trò', N'Gán vai trò và phân quyền');
GO

INSERT INTO QUAN_TRI_VAI_TRO_QUYEN (IDVaiTro, IDQuyen)
SELECT r.IDVaiTro, p.IDQuyen
FROM QUAN_TRI_VAI_TRO r
CROSS JOIN QUAN_TRI_QUYEN p
WHERE r.MaVaiTro = 'SUPER_ADMIN';
GO

INSERT INTO QUAN_TRI_VAI_TRO_QUYEN (IDVaiTro, IDQuyen)
SELECT r.IDVaiTro, p.IDQuyen
FROM QUAN_TRI_VAI_TRO r
INNER JOIN QUAN_TRI_QUYEN p ON p.MaQuyen IN ('ARTICLE_CREATE','ARTICLE_EDIT','TAXONOMY_MANAGE','MEDIA_MANAGE','FEEDBACK_HANDLE')
WHERE r.MaVaiTro = 'CONTENT_ADMIN';
GO

INSERT INTO QUAN_TRI_VAI_TRO_QUYEN (IDVaiTro, IDQuyen)
SELECT r.IDVaiTro, p.IDQuyen
FROM QUAN_TRI_VAI_TRO r
INNER JOIN QUAN_TRI_QUYEN p ON p.MaQuyen IN ('ARTICLE_REVIEW','ARTICLE_PUBLISH','DASHBOARD_VIEW')
WHERE r.MaVaiTro = 'REVIEWER';
GO

INSERT INTO QUAN_TRI_VAI_TRO_QUYEN (IDVaiTro, IDQuyen)
SELECT r.IDVaiTro, p.IDQuyen
FROM QUAN_TRI_VAI_TRO r
INNER JOIN QUAN_TRI_QUYEN p ON p.MaQuyen IN ('AI_SYNC_MANAGE','DASHBOARD_VIEW')
WHERE r.MaVaiTro = 'AI_ADMIN';
GO

INSERT INTO QUAN_TRI_VAI_TRO_QUYEN (IDVaiTro, IDQuyen)
SELECT r.IDVaiTro, p.IDQuyen
FROM QUAN_TRI_VAI_TRO r
INNER JOIN QUAN_TRI_QUYEN p ON p.MaQuyen IN ('DASHBOARD_VIEW','FEEDBACK_HANDLE')
WHERE r.MaVaiTro = 'ANALYST';
GO

INSERT INTO DANH_MUC_CHU_DE (MaDanhMuc, ThuTuSapXep, HoatDong)
VALUES
('LE_HOI', 1, 1),
('TIN_NGUONG', 2, 1),
('PHONG_TUC', 3, 1),
('AM_THUC', 4, 1),
('TRANG_PHUC', 5, 1),
('NGHE_THUAT_DAN_GIAN', 6, 1),
('KIEN_TRUC', 7, 1),
('BIEU_TUONG_VAN_HOA', 8, 1);
GO

INSERT INTO DANH_MUC_CHU_DE_BAN_DICH (IDDanhMuc, MaNgonNgu, TenDanhMuc, MoTa)
SELECT IDDanhMuc, 'vi',
       CASE MaDanhMuc
            WHEN 'LE_HOI' THEN N'Lễ hội'
            WHEN 'TIN_NGUONG' THEN N'Tín ngưỡng'
            WHEN 'PHONG_TUC' THEN N'Phong tục'
            WHEN 'AM_THUC' THEN N'Ẩm thực'
            WHEN 'TRANG_PHUC' THEN N'Trang phục'
            WHEN 'NGHE_THUAT_DAN_GIAN' THEN N'Nghệ thuật dân gian'
            WHEN 'KIEN_TRUC' THEN N'Kiến trúc'
            WHEN 'BIEU_TUONG_VAN_HOA' THEN N'Biểu tượng văn hoá'
       END,
       NULL
FROM DANH_MUC_CHU_DE;
GO

INSERT INTO DANH_MUC_CHU_DE_BAN_DICH (IDDanhMuc, MaNgonNgu, TenDanhMuc, MoTa)
SELECT IDDanhMuc, 'en',
       CASE MaDanhMuc
            WHEN 'LE_HOI' THEN N'Festival'
            WHEN 'TIN_NGUONG' THEN N'Belief'
            WHEN 'PHONG_TUC' THEN N'Custom'
            WHEN 'AM_THUC' THEN N'Cuisine'
            WHEN 'TRANG_PHUC' THEN N'Traditional Clothing'
            WHEN 'NGHE_THUAT_DAN_GIAN' THEN N'Folk Art'
            WHEN 'KIEN_TRUC' THEN N'Traditional Architecture'
            WHEN 'BIEU_TUONG_VAN_HOA' THEN N'Cultural Symbol'
       END,
       NULL
FROM DANH_MUC_CHU_DE;
GO

INSERT INTO VUNG_VAN_HOA (MaVung, IDVungCha, LoaiVung, DuLieuBanDoGeoJson, ThuTuSapXep, HoatDong)
VALUES
('MIEN_BAC', NULL, 'VAN_HOA', NULL, 1, 1),
('MIEN_TRUNG', NULL, 'VAN_HOA', NULL, 2, 1),
('MIEN_NAM', NULL, 'VAN_HOA', NULL, 3, 1),
('TAY_NGUYEN', NULL, 'VAN_HOA', NULL, 4, 1),
('DONG_BANG_SONG_CUU_LONG', NULL, 'VAN_HOA', NULL, 5, 1);
GO

INSERT INTO VUNG_VAN_HOA_BAN_DICH (IDVung, MaNgonNgu, TenVung, MoTa)
SELECT IDVung, 'vi',
       CASE MaVung
            WHEN 'MIEN_BAC' THEN N'Miền Bắc'
            WHEN 'MIEN_TRUNG' THEN N'Miền Trung'
            WHEN 'MIEN_NAM' THEN N'Miền Nam'
            WHEN 'TAY_NGUYEN' THEN N'Tây Nguyên'
            WHEN 'DONG_BANG_SONG_CUU_LONG' THEN N'Đồng bằng sông Cửu Long'
       END,
       NULL
FROM VUNG_VAN_HOA;
GO

INSERT INTO VUNG_VAN_HOA_BAN_DICH (IDVung, MaNgonNgu, TenVung, MoTa)
SELECT IDVung, 'en',
       CASE MaVung
            WHEN 'MIEN_BAC' THEN N'Northern Region'
            WHEN 'MIEN_TRUNG' THEN N'Central Region'
            WHEN 'MIEN_NAM' THEN N'Southern Region'
            WHEN 'TAY_NGUYEN' THEN N'Central Highlands'
            WHEN 'DONG_BANG_SONG_CUU_LONG' THEN N'Mekong Delta'
       END,
       NULL
FROM VUNG_VAN_HOA;
GO

/* =========================================================
   23. GHI CHU
   =========================================================
   - BAI_VIET la bang trung tam cua kho tri thuc.
   - BAI_VIET_BAN_DICH luu noi dung song ngu va trang thai soat/duyet.
   - PHIEN_BAN_BAI_VIET + LICH_SU_TRANG_THAI_BAI_VIET phuc vu BR17.
   - NGUON_THAM_KHAO + BAI_VIET_NGUON_THAM_KHAO phuc vu BR12.
   - DOT_DONG_BO_TRI_THUC_AI / TAI_LIEU_TRI_THUC_AI / DOAN_TRI_THUC_AI phuc vu RAG.
   - PHIEN_CHAT_AI / TIN_NHAN_CHAT_AI / TRICH_DAN_TIN_NHAN_AI / CAU_HOI_CAN_BO_SUNG phuc vu AI co kiem soat.
   - PHAN_HOI_NOI_DUNG / NHAT_KY_TIM_KIEM / NHAT_KY_XEM_BAI_VIET / NHAT_KY_QUAN_TRI phuc vu dashboard va cai tien lien tuc.
   ========================================================= */


   USE VNCultureBridgeAI;
SET NOCOUNT ON;

BEGIN TRY
    BEGIN TRAN;

    /* =========================================================
       0. BIEN DUNG CHUNG
       ========================================================= */
    DECLARE 
        @SuperAdminId BIGINT,
        @ContentAdminId BIGINT,
        @ReviewerId BIGINT,
        @AIAdminId BIGINT,

        @BaiTet BIGINT,
        @BaiThoCung BIGINT,
        @BaiAoDai BIGINT,
        @BaiCaTru BIGINT,
        @BaiNhaRong BIGINT,
        @BaiPho BIGINT,
        @BaiCongChieng BIGINT,

        @NguonTet BIGINT,
        @NguonThoCung BIGINT,
        @NguonAoDai BIGINT,
        @NguonCaTru BIGINT,
        @NguonNhaRong BIGINT,
        @NguonPho BIGINT,
        @NguonCongChieng BIGINT,

        @MediaTet BIGINT,
        @MediaThoCung BIGINT,
        @MediaAoDai BIGINT,
        @MediaCaTru BIGINT,
        @MediaNhaRong BIGINT,
        @MediaPho BIGINT,
        @MediaCongChieng BIGINT,

        @PhienKhachEN UNIQUEIDENTIFIER,
        @PhienKhachVI UNIQUEIDENTIFIER,
        @PhienChat1 UNIQUEIDENTIFIER,
        @PhienChat2 UNIQUEIDENTIFIER,

        @TinNhanAI1 BIGINT,
        @TinNhanAI2 BIGINT,
        @TinNhanAI3 BIGINT,

        @DotDongBo1 BIGINT,

        @TaiLieuTetVI BIGINT,
        @TaiLieuTetEN BIGINT,
        @TaiLieuThoCungEN BIGINT,
        @TaiLieuAoDaiEN BIGINT,

        @DoanTetVI1 BIGINT,
        @DoanTetEN1 BIGINT,
        @DoanThoCungEN1 BIGINT,
        @DoanAoDaiEN1 BIGINT;

    /* =========================================================
       1. USER QUAN TRI
       ========================================================= */
    IF NOT EXISTS (SELECT 1 FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'superadmin')
    BEGIN
        INSERT INTO QUAN_TRI_NGUOI_DUNG
        (
            TenDangNhap, Email, MatKhauHash, HoTen, TrangThai, LanDangNhapCuoi
        )
        VALUES
        (
            N'superadmin',
            N'superadmin@vnculturebridge.ai',
            N'hash_superadmin_demo',
            N'Nguyễn Quản Trị Tổng',
            'HOAT_DONG',
            SYSUTCDATETIME()
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'contentadmin')
    BEGIN
        INSERT INTO QUAN_TRI_NGUOI_DUNG
        (
            TenDangNhap, Email, MatKhauHash, HoTen, TrangThai, LanDangNhapCuoi
        )
        VALUES
        (
            N'contentadmin',
            N'contentadmin@vnculturebridge.ai',
            N'hash_content_admin_demo',
            N'Trần Biên Tập Nội Dung',
            'HOAT_DONG',
            SYSUTCDATETIME()
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'reviewer')
    BEGIN
        INSERT INTO QUAN_TRI_NGUOI_DUNG
        (
            TenDangNhap, Email, MatKhauHash, HoTen, TrangThai, LanDangNhapCuoi
        )
        VALUES
        (
            N'reviewer',
            N'reviewer@vnculturebridge.ai',
            N'hash_reviewer_demo',
            N'Lê Kiểm Duyệt',
            'HOAT_DONG',
            SYSUTCDATETIME()
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'aiadmin')
    BEGIN
        INSERT INTO QUAN_TRI_NGUOI_DUNG
        (
            TenDangNhap, Email, MatKhauHash, HoTen, TrangThai, LanDangNhapCuoi
        )
        VALUES
        (
            N'aiadmin',
            N'aiadmin@vnculturebridge.ai',
            N'hash_ai_admin_demo',
            N'Phạm Quản Trị AI',
            'HOAT_DONG',
            SYSUTCDATETIME()
        );
    END;

    SELECT @SuperAdminId = IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'superadmin';
    SELECT @ContentAdminId = IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'contentadmin';
    SELECT @ReviewerId = IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'reviewer';
    SELECT @AIAdminId = IDNguoiDung FROM QUAN_TRI_NGUOI_DUNG WHERE TenDangNhap = N'aiadmin';

    IF NOT EXISTS (
        SELECT 1
        FROM QUAN_TRI_NGUOI_DUNG_VAI_TRO uv
        INNER JOIN QUAN_TRI_VAI_TRO v ON uv.IDVaiTro = v.IDVaiTro
        WHERE uv.IDNguoiDung = @SuperAdminId AND v.MaVaiTro = 'SUPER_ADMIN'
    )
    BEGIN
        INSERT INTO QUAN_TRI_NGUOI_DUNG_VAI_TRO (IDNguoiDung, IDVaiTro, IDNguoiGan)
        SELECT @SuperAdminId, IDVaiTro, @SuperAdminId
        FROM QUAN_TRI_VAI_TRO
        WHERE MaVaiTro = 'SUPER_ADMIN';
    END;

    IF NOT EXISTS (
        SELECT 1
        FROM QUAN_TRI_NGUOI_DUNG_VAI_TRO uv
        INNER JOIN QUAN_TRI_VAI_TRO v ON uv.IDVaiTro = v.IDVaiTro
        WHERE uv.IDNguoiDung = @ContentAdminId AND v.MaVaiTro = 'CONTENT_ADMIN'
    )
    BEGIN
        INSERT INTO QUAN_TRI_NGUOI_DUNG_VAI_TRO (IDNguoiDung, IDVaiTro, IDNguoiGan)
        SELECT @ContentAdminId, IDVaiTro, @SuperAdminId
        FROM QUAN_TRI_VAI_TRO
        WHERE MaVaiTro = 'CONTENT_ADMIN';
    END;

    IF NOT EXISTS (
        SELECT 1
        FROM QUAN_TRI_NGUOI_DUNG_VAI_TRO uv
        INNER JOIN QUAN_TRI_VAI_TRO v ON uv.IDVaiTro = v.IDVaiTro
        WHERE uv.IDNguoiDung = @ReviewerId AND v.MaVaiTro = 'REVIEWER'
    )
    BEGIN
        INSERT INTO QUAN_TRI_NGUOI_DUNG_VAI_TRO (IDNguoiDung, IDVaiTro, IDNguoiGan)
        SELECT @ReviewerId, IDVaiTro, @SuperAdminId
        FROM QUAN_TRI_VAI_TRO
        WHERE MaVaiTro = 'REVIEWER';
    END;

    IF NOT EXISTS (
        SELECT 1
        FROM QUAN_TRI_NGUOI_DUNG_VAI_TRO uv
        INNER JOIN QUAN_TRI_VAI_TRO v ON uv.IDVaiTro = v.IDVaiTro
        WHERE uv.IDNguoiDung = @AIAdminId AND v.MaVaiTro = 'AI_ADMIN'
    )
    BEGIN
        INSERT INTO QUAN_TRI_NGUOI_DUNG_VAI_TRO (IDNguoiDung, IDVaiTro, IDNguoiGan)
        SELECT @AIAdminId, IDVaiTro, @SuperAdminId
        FROM QUAN_TRI_VAI_TRO
        WHERE MaVaiTro = 'AI_ADMIN';
    END;

    /* =========================================================
       2. DAM BAO DANH MUC CHU DE CO SAN
       ========================================================= */
    IF NOT EXISTS (SELECT 1 FROM DANH_MUC_CHU_DE WHERE MaDanhMuc = 'LE_HOI')
        INSERT INTO DANH_MUC_CHU_DE (MaDanhMuc, ThuTuSapXep, HoatDong) VALUES ('LE_HOI', 1, 1);

    IF NOT EXISTS (SELECT 1 FROM DANH_MUC_CHU_DE WHERE MaDanhMuc = 'TIN_NGUONG')
        INSERT INTO DANH_MUC_CHU_DE (MaDanhMuc, ThuTuSapXep, HoatDong) VALUES ('TIN_NGUONG', 2, 1);

    IF NOT EXISTS (SELECT 1 FROM DANH_MUC_CHU_DE WHERE MaDanhMuc = 'PHONG_TUC')
        INSERT INTO DANH_MUC_CHU_DE (MaDanhMuc, ThuTuSapXep, HoatDong) VALUES ('PHONG_TUC', 3, 1);

    IF NOT EXISTS (SELECT 1 FROM DANH_MUC_CHU_DE WHERE MaDanhMuc = 'AM_THUC')
        INSERT INTO DANH_MUC_CHU_DE (MaDanhMuc, ThuTuSapXep, HoatDong) VALUES ('AM_THUC', 4, 1);

    IF NOT EXISTS (SELECT 1 FROM DANH_MUC_CHU_DE WHERE MaDanhMuc = 'TRANG_PHUC')
        INSERT INTO DANH_MUC_CHU_DE (MaDanhMuc, ThuTuSapXep, HoatDong) VALUES ('TRANG_PHUC', 5, 1);

    IF NOT EXISTS (SELECT 1 FROM DANH_MUC_CHU_DE WHERE MaDanhMuc = 'NGHE_THUAT_DAN_GIAN')
        INSERT INTO DANH_MUC_CHU_DE (MaDanhMuc, ThuTuSapXep, HoatDong) VALUES ('NGHE_THUAT_DAN_GIAN', 6, 1);

    IF NOT EXISTS (SELECT 1 FROM DANH_MUC_CHU_DE WHERE MaDanhMuc = 'KIEN_TRUC')
        INSERT INTO DANH_MUC_CHU_DE (MaDanhMuc, ThuTuSapXep, HoatDong) VALUES ('KIEN_TRUC', 7, 1);

    IF NOT EXISTS (SELECT 1 FROM DANH_MUC_CHU_DE WHERE MaDanhMuc = 'BIEU_TUONG')
        INSERT INTO DANH_MUC_CHU_DE (MaDanhMuc, ThuTuSapXep, HoatDong) VALUES ('BIEU_TUONG', 8, 1);

    INSERT INTO DANH_MUC_CHU_DE_BAN_DICH (IDDanhMuc, MaNgonNgu, TenDanhMuc, MoTa)
    SELECT d.IDDanhMuc, 'vi',
           CASE d.MaDanhMuc
                WHEN 'LE_HOI' THEN N'Lễ hội'
                WHEN 'TIN_NGUONG' THEN N'Tín ngưỡng'
                WHEN 'PHONG_TUC' THEN N'Phong tục'
                WHEN 'AM_THUC' THEN N'Ẩm thực'
                WHEN 'TRANG_PHUC' THEN N'Trang phục'
                WHEN 'NGHE_THUAT_DAN_GIAN' THEN N'Nghệ thuật dân gian'
                WHEN 'KIEN_TRUC' THEN N'Kiến trúc'
                WHEN 'BIEU_TUONG' THEN N'Biểu tượng văn hoá'
           END,
           NULL
    FROM DANH_MUC_CHU_DE d
    WHERE d.MaDanhMuc IN ('LE_HOI','TIN_NGUONG','PHONG_TUC','AM_THUC','TRANG_PHUC','NGHE_THUAT_DAN_GIAN','KIEN_TRUC','BIEU_TUONG')
      AND NOT EXISTS (
          SELECT 1 FROM DANH_MUC_CHU_DE_BAN_DICH x
          WHERE x.IDDanhMuc = d.IDDanhMuc AND x.MaNgonNgu = 'vi'
      );

    INSERT INTO DANH_MUC_CHU_DE_BAN_DICH (IDDanhMuc, MaNgonNgu, TenDanhMuc, MoTa)
    SELECT d.IDDanhMuc, 'en',
           CASE d.MaDanhMuc
                WHEN 'LE_HOI' THEN N'Festivals'
                WHEN 'TIN_NGUONG' THEN N'Beliefs'
                WHEN 'PHONG_TUC' THEN N'Customs'
                WHEN 'AM_THUC' THEN N'Cuisine'
                WHEN 'TRANG_PHUC' THEN N'Costume'
                WHEN 'NGHE_THUAT_DAN_GIAN' THEN N'Folk Arts'
                WHEN 'KIEN_TRUC' THEN N'Architecture'
                WHEN 'BIEU_TUONG' THEN N'Cultural Symbols'
           END,
           NULL
    FROM DANH_MUC_CHU_DE d
    WHERE d.MaDanhMuc IN ('LE_HOI','TIN_NGUONG','PHONG_TUC','AM_THUC','TRANG_PHUC','NGHE_THUAT_DAN_GIAN','KIEN_TRUC','BIEU_TUONG')
      AND NOT EXISTS (
          SELECT 1 FROM DANH_MUC_CHU_DE_BAN_DICH x
          WHERE x.IDDanhMuc = d.IDDanhMuc AND x.MaNgonNgu = 'en'
      );

    /* =========================================================
       3. DAM BAO VUNG VAN HOA CO SAN
       ========================================================= */
    IF NOT EXISTS (SELECT 1 FROM VUNG_VAN_HOA WHERE MaVung = 'MIEN_BAC')
        INSERT INTO VUNG_VAN_HOA (MaVung, LoaiVung, ThuTuSapXep, HoatDong) VALUES ('MIEN_BAC', 'VAN_HOA', 1, 1);

    IF NOT EXISTS (SELECT 1 FROM VUNG_VAN_HOA WHERE MaVung = 'MIEN_TRUNG')
        INSERT INTO VUNG_VAN_HOA (MaVung, LoaiVung, ThuTuSapXep, HoatDong) VALUES ('MIEN_TRUNG', 'VAN_HOA', 2, 1);

    IF NOT EXISTS (SELECT 1 FROM VUNG_VAN_HOA WHERE MaVung = 'MIEN_NAM')
        INSERT INTO VUNG_VAN_HOA (MaVung, LoaiVung, ThuTuSapXep, HoatDong) VALUES ('MIEN_NAM', 'VAN_HOA', 3, 1);

    IF NOT EXISTS (SELECT 1 FROM VUNG_VAN_HOA WHERE MaVung = 'TAY_NGUYEN')
        INSERT INTO VUNG_VAN_HOA (MaVung, LoaiVung, ThuTuSapXep, HoatDong) VALUES ('TAY_NGUYEN', 'VAN_HOA', 4, 1);

    IF NOT EXISTS (SELECT 1 FROM VUNG_VAN_HOA WHERE MaVung = 'DONG_BANG_SONG_CUU_LONG')
        INSERT INTO VUNG_VAN_HOA (MaVung, LoaiVung, ThuTuSapXep, HoatDong) VALUES ('DONG_BANG_SONG_CUU_LONG', 'VAN_HOA', 5, 1);

    INSERT INTO VUNG_VAN_HOA_BAN_DICH (IDVung, MaNgonNgu, TenVung, MoTa)
    SELECT v.IDVung, 'vi',
           CASE v.MaVung
                WHEN 'MIEN_BAC' THEN N'Miền Bắc'
                WHEN 'MIEN_TRUNG' THEN N'Miền Trung'
                WHEN 'MIEN_NAM' THEN N'Miền Nam'
                WHEN 'TAY_NGUYEN' THEN N'Tây Nguyên'
                WHEN 'DONG_BANG_SONG_CUU_LONG' THEN N'Đồng bằng sông Cửu Long'
           END,
           NULL
    FROM VUNG_VAN_HOA v
    WHERE v.MaVung IN ('MIEN_BAC','MIEN_TRUNG','MIEN_NAM','TAY_NGUYEN','DONG_BANG_SONG_CUU_LONG')
      AND NOT EXISTS (
          SELECT 1 FROM VUNG_VAN_HOA_BAN_DICH x
          WHERE x.IDVung = v.IDVung AND x.MaNgonNgu = 'vi'
      );

    INSERT INTO VUNG_VAN_HOA_BAN_DICH (IDVung, MaNgonNgu, TenVung, MoTa)
    SELECT v.IDVung, 'en',
           CASE v.MaVung
                WHEN 'MIEN_BAC' THEN N'Northern Region'
                WHEN 'MIEN_TRUNG' THEN N'Central Region'
                WHEN 'MIEN_NAM' THEN N'Southern Region'
                WHEN 'TAY_NGUYEN' THEN N'Central Highlands'
                WHEN 'DONG_BANG_SONG_CUU_LONG' THEN N'Mekong Delta'
           END,
           NULL
    FROM VUNG_VAN_HOA v
    WHERE v.MaVung IN ('MIEN_BAC','MIEN_TRUNG','MIEN_NAM','TAY_NGUYEN','DONG_BANG_SONG_CUU_LONG')
      AND NOT EXISTS (
          SELECT 1 FROM VUNG_VAN_HOA_BAN_DICH x
          WHERE x.IDVung = v.IDVung AND x.MaNgonNgu = 'en'
      );

    /* =========================================================
       4. DAN TOC
       ========================================================= */
    IF NOT EXISTS (SELECT 1 FROM DAN_TOC WHERE MaDanToc = 'KINH')
        INSERT INTO DAN_TOC (MaDanToc, ThuTuSapXep, HoatDong) VALUES ('KINH', 1, 1);

    IF NOT EXISTS (SELECT 1 FROM DAN_TOC WHERE MaDanToc = 'TAY')
        INSERT INTO DAN_TOC (MaDanToc, ThuTuSapXep, HoatDong) VALUES ('TAY', 2, 1);

    IF NOT EXISTS (SELECT 1 FROM DAN_TOC WHERE MaDanToc = 'HMONG')
        INSERT INTO DAN_TOC (MaDanToc, ThuTuSapXep, HoatDong) VALUES ('HMONG', 3, 1);

    IF NOT EXISTS (SELECT 1 FROM DAN_TOC WHERE MaDanToc = 'CHAM')
        INSERT INTO DAN_TOC (MaDanToc, ThuTuSapXep, HoatDong) VALUES ('CHAM', 4, 1);

    IF NOT EXISTS (SELECT 1 FROM DAN_TOC WHERE MaDanToc = 'EDE')
        INSERT INTO DAN_TOC (MaDanToc, ThuTuSapXep, HoatDong) VALUES ('EDE', 5, 1);

    IF NOT EXISTS (SELECT 1 FROM DAN_TOC WHERE MaDanToc = 'KHMER')
        INSERT INTO DAN_TOC (MaDanToc, ThuTuSapXep, HoatDong) VALUES ('KHMER', 6, 1);

    INSERT INTO DAN_TOC_BAN_DICH (IDDanToc, MaNgonNgu, TenDanToc, MoTa)
    SELECT d.IDDanToc, 'vi',
           CASE d.MaDanToc
                WHEN 'KINH' THEN N'Kinh'
                WHEN 'TAY' THEN N'Tày'
                WHEN 'HMONG' THEN N'H’Mông'
                WHEN 'CHAM' THEN N'Chăm'
                WHEN 'EDE' THEN N'Ê Đê'
                WHEN 'KHMER' THEN N'Khmer'
           END,
           NULL
    FROM DAN_TOC d
    WHERE d.MaDanToc IN ('KINH','TAY','HMONG','CHAM','EDE','KHMER')
      AND NOT EXISTS (
          SELECT 1 FROM DAN_TOC_BAN_DICH x
          WHERE x.IDDanToc = d.IDDanToc AND x.MaNgonNgu = 'vi'
      );

    INSERT INTO DAN_TOC_BAN_DICH (IDDanToc, MaNgonNgu, TenDanToc, MoTa)
    SELECT d.IDDanToc, 'en',
           CASE d.MaDanToc
                WHEN 'KINH' THEN N'Kinh'
                WHEN 'TAY' THEN N'Tay'
                WHEN 'HMONG' THEN N'Hmong'
                WHEN 'CHAM' THEN N'Cham'
                WHEN 'EDE' THEN N'Ede'
                WHEN 'KHMER' THEN N'Khmer'
           END,
           NULL
    FROM DAN_TOC d
    WHERE d.MaDanToc IN ('KINH','TAY','HMONG','CHAM','EDE','KHMER')
      AND NOT EXISTS (
          SELECT 1 FROM DAN_TOC_BAN_DICH x
          WHERE x.IDDanToc = d.IDDanToc AND x.MaNgonNgu = 'en'
      );

    /* =========================================================
       5. THE NOI DUNG
       ========================================================= */
    IF NOT EXISTS (SELECT 1 FROM THE_NOI_DUNG WHERE MaThe = 'TET')
        INSERT INTO THE_NOI_DUNG (MaThe, HoatDong) VALUES ('TET', 1);

    IF NOT EXISTS (SELECT 1 FROM THE_NOI_DUNG WHERE MaThe = 'THO_CUNG_TO_TIEN')
        INSERT INTO THE_NOI_DUNG (MaThe, HoatDong) VALUES ('THO_CUNG_TO_TIEN', 1);

    IF NOT EXISTS (SELECT 1 FROM THE_NOI_DUNG WHERE MaThe = 'AO_DAI')
        INSERT INTO THE_NOI_DUNG (MaThe, HoatDong) VALUES ('AO_DAI', 1);

    IF NOT EXISTS (SELECT 1 FROM THE_NOI_DUNG WHERE MaThe = 'CA_TRU')
        INSERT INTO THE_NOI_DUNG (MaThe, HoatDong) VALUES ('CA_TRU', 1);

    IF NOT EXISTS (SELECT 1 FROM THE_NOI_DUNG WHERE MaThe = 'NHA_RONG')
        INSERT INTO THE_NOI_DUNG (MaThe, HoatDong) VALUES ('NHA_RONG', 1);

    IF NOT EXISTS (SELECT 1 FROM THE_NOI_DUNG WHERE MaThe = 'PHO')
        INSERT INTO THE_NOI_DUNG (MaThe, HoatDong) VALUES ('PHO', 1);

    IF NOT EXISTS (SELECT 1 FROM THE_NOI_DUNG WHERE MaThe = 'CONG_CHIENG')
        INSERT INTO THE_NOI_DUNG (MaThe, HoatDong) VALUES ('CONG_CHIENG', 1);

    INSERT INTO THE_NOI_DUNG_BAN_DICH (IDThe, MaNgonNgu, TenThe, MoTa)
    SELECT t.IDThe, 'vi',
           CASE t.MaThe
                WHEN 'TET' THEN N'Tết'
                WHEN 'THO_CUNG_TO_TIEN' THEN N'Thờ cúng tổ tiên'
                WHEN 'AO_DAI' THEN N'Áo dài'
                WHEN 'CA_TRU' THEN N'Ca trù'
                WHEN 'NHA_RONG' THEN N'Nhà rông'
                WHEN 'PHO' THEN N'Phở'
                WHEN 'CONG_CHIENG' THEN N'Cồng chiêng'
           END,
           NULL
    FROM THE_NOI_DUNG t
    WHERE t.MaThe IN ('TET','THO_CUNG_TO_TIEN','AO_DAI','CA_TRU','NHA_RONG','PHO','CONG_CHIENG')
      AND NOT EXISTS (
          SELECT 1 FROM THE_NOI_DUNG_BAN_DICH x
          WHERE x.IDThe = t.IDThe AND x.MaNgonNgu = 'vi'
      );

    INSERT INTO THE_NOI_DUNG_BAN_DICH (IDThe, MaNgonNgu, TenThe, MoTa)
    SELECT t.IDThe, 'en',
           CASE t.MaThe
                WHEN 'TET' THEN N'Tet'
                WHEN 'THO_CUNG_TO_TIEN' THEN N'Ancestor Worship'
                WHEN 'AO_DAI' THEN N'Ao Dai'
                WHEN 'CA_TRU' THEN N'Ca Tru'
                WHEN 'NHA_RONG' THEN N'Communal Stilt House'
                WHEN 'PHO' THEN N'Pho'
                WHEN 'CONG_CHIENG' THEN N'Gong Culture'
           END,
           NULL
    FROM THE_NOI_DUNG t
    WHERE t.MaThe IN ('TET','THO_CUNG_TO_TIEN','AO_DAI','CA_TRU','NHA_RONG','PHO','CONG_CHIENG')
      AND NOT EXISTS (
          SELECT 1 FROM THE_NOI_DUNG_BAN_DICH x
          WHERE x.IDThe = t.IDThe AND x.MaNgonNgu = 'en'
      );

    /* =========================================================
       6. TU KHOA
       ========================================================= */
    IF NOT EXISTS (SELECT 1 FROM TU_KHOA WHERE MaTuKhoa = 'TET_NGUYEN_DAN')
        INSERT INTO TU_KHOA (MaTuKhoa, HoatDong) VALUES ('TET_NGUYEN_DAN', 1);

    IF NOT EXISTS (SELECT 1 FROM TU_KHOA WHERE MaTuKhoa = 'ANCESTOR_WORSHIP')
        INSERT INTO TU_KHOA (MaTuKhoa, HoatDong) VALUES ('ANCESTOR_WORSHIP', 1);

    IF NOT EXISTS (SELECT 1 FROM TU_KHOA WHERE MaTuKhoa = 'AO_DAI')
        INSERT INTO TU_KHOA (MaTuKhoa, HoatDong) VALUES ('AO_DAI', 1);

    IF NOT EXISTS (SELECT 1 FROM TU_KHOA WHERE MaTuKhoa = 'CA_TRU')
        INSERT INTO TU_KHOA (MaTuKhoa, HoatDong) VALUES ('CA_TRU', 1);

    IF NOT EXISTS (SELECT 1 FROM TU_KHOA WHERE MaTuKhoa = 'NHA_RONG')
        INSERT INTO TU_KHOA (MaTuKhoa, HoatDong) VALUES ('NHA_RONG', 1);

    IF NOT EXISTS (SELECT 1 FROM TU_KHOA WHERE MaTuKhoa = 'PHO_BO')
        INSERT INTO TU_KHOA (MaTuKhoa, HoatDong) VALUES ('PHO_BO', 1);

    IF NOT EXISTS (SELECT 1 FROM TU_KHOA WHERE MaTuKhoa = 'CONG_CHIENG_TAY_NGUYEN')
        INSERT INTO TU_KHOA (MaTuKhoa, HoatDong) VALUES ('CONG_CHIENG_TAY_NGUYEN', 1);

    INSERT INTO TU_KHOA_BAN_DICH (IDTuKhoa, MaNgonNgu, TuKhoaHienThi)
    SELECT k.IDTuKhoa, 'vi',
           CASE k.MaTuKhoa
                WHEN 'TET_NGUYEN_DAN' THEN N'Tết Nguyên Đán'
                WHEN 'ANCESTOR_WORSHIP' THEN N'Thờ cúng tổ tiên'
                WHEN 'AO_DAI' THEN N'Áo dài'
                WHEN 'CA_TRU' THEN N'Ca trù'
                WHEN 'NHA_RONG' THEN N'Nhà rông'
                WHEN 'PHO_BO' THEN N'Phở bò'
                WHEN 'CONG_CHIENG_TAY_NGUYEN' THEN N'Cồng chiêng Tây Nguyên'
           END
    FROM TU_KHOA k
    WHERE k.MaTuKhoa IN ('TET_NGUYEN_DAN','ANCESTOR_WORSHIP','AO_DAI','CA_TRU','NHA_RONG','PHO_BO','CONG_CHIENG_TAY_NGUYEN')
      AND NOT EXISTS (
          SELECT 1 FROM TU_KHOA_BAN_DICH x
          WHERE x.IDTuKhoa = k.IDTuKhoa AND x.MaNgonNgu = 'vi'
      );

    INSERT INTO TU_KHOA_BAN_DICH (IDTuKhoa, MaNgonNgu, TuKhoaHienThi)
    SELECT k.IDTuKhoa, 'en',
           CASE k.MaTuKhoa
                WHEN 'TET_NGUYEN_DAN' THEN N'Tet Nguyen Dan'
                WHEN 'ANCESTOR_WORSHIP' THEN N'Ancestor worship'
                WHEN 'AO_DAI' THEN N'Ao Dai'
                WHEN 'CA_TRU' THEN N'Ca Tru'
                WHEN 'NHA_RONG' THEN N'Communal stilt house'
                WHEN 'PHO_BO' THEN N'Pho bo'
                WHEN 'CONG_CHIENG_TAY_NGUYEN' THEN N'Central Highlands gong culture'
           END
    FROM TU_KHOA k
    WHERE k.MaTuKhoa IN ('TET_NGUYEN_DAN','ANCESTOR_WORSHIP','AO_DAI','CA_TRU','NHA_RONG','PHO_BO','CONG_CHIENG_TAY_NGUYEN')
      AND NOT EXISTS (
          SELECT 1 FROM TU_KHOA_BAN_DICH x
          WHERE x.IDTuKhoa = k.IDTuKhoa AND x.MaNgonNgu = 'en'
      );

    /* =========================================================
       7. NGUON THAM KHAO
       ========================================================= */
    IF NOT EXISTS (SELECT 1 FROM NGUON_THAM_KHAO WHERE TieuDeNguon = N'Tết Nguyên Đán và văn hoá sum họp gia đình ở Việt Nam')
    BEGIN
        INSERT INTO NGUON_THAM_KHAO
        (
            LoaiNguon, TieuDeNguon, TacGia, NhaXuatBan, NamXuatBan,
            URLNguon, MaNgonNguNguon, GhiChu, MucDoTinCay,
            DaXacMinh, IDNguoiXacMinh, NgayXacMinh
        )
        VALUES
        (
            'WEBSITE',
            N'Tết Nguyên Đán và văn hoá sum họp gia đình ở Việt Nam',
            N'Ban biên tập VNCultureBridge AI',
            N'VNCultureBridge AI',
            2026,
            N'https://example.org/tet-nguyen-dan-viet-nam',
            'vi',
            N'Nguồn tham khảo mẫu cho bài viết Tết',
            5,
            1,
            @ReviewerId,
            SYSUTCDATETIME()
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM NGUON_THAM_KHAO WHERE TieuDeNguon = N'Ancestor worship and filial piety in Vietnamese culture')
    BEGIN
        INSERT INTO NGUON_THAM_KHAO
        (
            LoaiNguon, TieuDeNguon, TacGia, NhaXuatBan, NamXuatBan,
            URLNguon, MaNgonNguNguon, GhiChu, MucDoTinCay,
            DaXacMinh, IDNguoiXacMinh, NgayXacMinh
        )
        VALUES
        (
            'WEBSITE',
            N'Ancestor worship and filial piety in Vietnamese culture',
            N'Editorial Team',
            N'VNCultureBridge AI',
            2026,
            N'https://example.org/ancestor-worship-vietnam',
            'en',
            N'Nguồn tham khảo mẫu cho tín ngưỡng thờ cúng tổ tiên',
            5,
            1,
            @ReviewerId,
            SYSUTCDATETIME()
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM NGUON_THAM_KHAO WHERE TieuDeNguon = N'Áo dài trong biểu tượng văn hoá Việt Nam hiện đại')
    BEGIN
        INSERT INTO NGUON_THAM_KHAO
        (
            LoaiNguon, TieuDeNguon, TacGia, NhaXuatBan, NamXuatBan,
            URLNguon, MaNgonNguNguon, GhiChu, MucDoTinCay,
            DaXacMinh, IDNguoiXacMinh, NgayXacMinh
        )
        VALUES
        (
            'WEBSITE',
            N'Áo dài trong biểu tượng văn hoá Việt Nam hiện đại',
            N'Nhóm nghiên cứu văn hoá',
            N'VNCultureBridge AI',
            2026,
            N'https://example.org/ao-dai-vietnam',
            'vi',
            N'Nguồn tham khảo mẫu cho áo dài',
            4,
            1,
            @ReviewerId,
            SYSUTCDATETIME()
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM NGUON_THAM_KHAO WHERE TieuDeNguon = N'Ca trù as an intimate form of Northern Vietnamese performance')
    BEGIN
        INSERT INTO NGUON_THAM_KHAO
        (
            LoaiNguon, TieuDeNguon, TacGia, NhaXuatBan, NamXuatBan,
            URLNguon, MaNgonNguNguon, GhiChu, MucDoTinCay,
            DaXacMinh, IDNguoiXacMinh, NgayXacMinh
        )
        VALUES
        (
            'WEBSITE',
            N'Ca trù as an intimate form of Northern Vietnamese performance',
            N'Editorial Team',
            N'VNCultureBridge AI',
            2026,
            N'https://example.org/ca-tru-vietnam',
            'en',
            N'Nguồn tham khảo mẫu cho ca trù',
            4,
            1,
            @ReviewerId,
            SYSUTCDATETIME()
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM NGUON_THAM_KHAO WHERE TieuDeNguon = N'Nhà rông và đời sống cộng đồng ở Tây Nguyên')
    BEGIN
        INSERT INTO NGUON_THAM_KHAO
        (
            LoaiNguon, TieuDeNguon, TacGia, NhaXuatBan, NamXuatBan,
            URLNguon, MaNgonNguNguon, GhiChu, MucDoTinCay,
            DaXacMinh, IDNguoiXacMinh, NgayXacMinh
        )
        VALUES
        (
            'WEBSITE',
            N'Nhà rông và đời sống cộng đồng ở Tây Nguyên',
            N'Tổ biên tập',
            N'VNCultureBridge AI',
            2026,
            N'https://example.org/nha-rong-tay-nguyen',
            'vi',
            N'Nguồn tham khảo mẫu cho nhà rông',
            4,
            1,
            @ReviewerId,
            SYSUTCDATETIME()
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM NGUON_THAM_KHAO WHERE TieuDeNguon = N'Pho as a culinary symbol of Vietnam')
    BEGIN
        INSERT INTO NGUON_THAM_KHAO
        (
            LoaiNguon, TieuDeNguon, TacGia, NhaXuatBan, NamXuatBan,
            URLNguon, MaNgonNguNguon, GhiChu, MucDoTinCay,
            DaXacMinh, IDNguoiXacMinh, NgayXacMinh
        )
        VALUES
        (
            'WEBSITE',
            N'Pho as a culinary symbol of Vietnam',
            N'Editorial Team',
            N'VNCultureBridge AI',
            2026,
            N'https://example.org/pho-vietnam',
            'en',
            N'Nguồn tham khảo mẫu cho phở',
            4,
            1,
            @ReviewerId,
            SYSUTCDATETIME()
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM NGUON_THAM_KHAO WHERE TieuDeNguon = N'Không gian văn hoá cồng chiêng Tây Nguyên')
    BEGIN
        INSERT INTO NGUON_THAM_KHAO
        (
            LoaiNguon, TieuDeNguon, TacGia, NhaXuatBan, NamXuatBan,
            URLNguon, MaNgonNguNguon, GhiChu, MucDoTinCay,
            DaXacMinh, IDNguoiXacMinh, NgayXacMinh
        )
        VALUES
        (
            'WEBSITE',
            N'Không gian văn hoá cồng chiêng Tây Nguyên',
            N'Tổ biên tập di sản',
            N'VNCultureBridge AI',
            2026,
            N'https://example.org/cong-chieng-tay-nguyen',
            'vi',
            N'Nguồn tham khảo mẫu cho cồng chiêng',
            5,
            1,
            @ReviewerId,
            SYSUTCDATETIME()
        );
    END;

    SELECT @NguonTet = IDNguon FROM NGUON_THAM_KHAO WHERE TieuDeNguon = N'Tết Nguyên Đán và văn hoá sum họp gia đình ở Việt Nam';
    SELECT @NguonThoCung = IDNguon FROM NGUON_THAM_KHAO WHERE TieuDeNguon = N'Ancestor worship and filial piety in Vietnamese culture';
    SELECT @NguonAoDai = IDNguon FROM NGUON_THAM_KHAO WHERE TieuDeNguon = N'Áo dài trong biểu tượng văn hoá Việt Nam hiện đại';
    SELECT @NguonCaTru = IDNguon FROM NGUON_THAM_KHAO WHERE TieuDeNguon = N'Ca trù as an intimate form of Northern Vietnamese performance';
    SELECT @NguonNhaRong = IDNguon FROM NGUON_THAM_KHAO WHERE TieuDeNguon = N'Nhà rông và đời sống cộng đồng ở Tây Nguyên';
    SELECT @NguonPho = IDNguon FROM NGUON_THAM_KHAO WHERE TieuDeNguon = N'Pho as a culinary symbol of Vietnam';
    SELECT @NguonCongChieng = IDNguon FROM NGUON_THAM_KHAO WHERE TieuDeNguon = N'Không gian văn hoá cồng chiêng Tây Nguyên';

    /* =========================================================
       8. MEDIA + BAN DICH MEDIA
       ========================================================= */
    IF NOT EXISTS (SELECT 1 FROM MEDIA WHERE TenTep = N'tet-nguyen-dan.jpg')
    BEGIN
        INSERT INTO MEDIA
        (
            LoaiMedia, TenTep, DuongDanTep, NhaCungCapLuuTru, MimeType,
            KichThuocBytes, RongPx, CaoPx, ChuSoHuuBanQuyen, ThongTinGiayPhep,
            TrangThai, IDNguoiTaiLen
        )
        VALUES
        (
            'HINH_ANH', N'tet-nguyen-dan.jpg', N'/media/tet-nguyen-dan.jpg', N'local',
            N'image/jpeg', 245000, 1600, 900, N'VNCultureBridge AI',
            N'Demo license', 'NHAP', @ContentAdminId
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM MEDIA WHERE TenTep = N'tho-cung-to-tien.jpg')
    BEGIN
        INSERT INTO MEDIA
        (
            LoaiMedia, TenTep, DuongDanTep, NhaCungCapLuuTru, MimeType,
            KichThuocBytes, RongPx, CaoPx, ChuSoHuuBanQuyen, ThongTinGiayPhep,
            TrangThai, IDNguoiTaiLen
        )
        VALUES
        (
            'HINH_ANH', N'tho-cung-to-tien.jpg', N'/media/tho-cung-to-tien.jpg', N'local',
            N'image/jpeg', 210000, 1400, 900, N'VNCultureBridge AI',
            N'Demo license', 'NHAP', @ContentAdminId
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM MEDIA WHERE TenTep = N'ao-dai-viet-nam.jpg')
    BEGIN
        INSERT INTO MEDIA
        (
            LoaiMedia, TenTep, DuongDanTep, NhaCungCapLuuTru, MimeType,
            KichThuocBytes, RongPx, CaoPx, ChuSoHuuBanQuyen, ThongTinGiayPhep,
            TrangThai, IDNguoiTaiLen
        )
        VALUES
        (
            'HINH_ANH', N'ao-dai-viet-nam.jpg', N'/media/ao-dai-viet-nam.jpg', N'local',
            N'image/jpeg', 198000, 1400, 933, N'VNCultureBridge AI',
            N'Demo license', 'NHAP', @ContentAdminId
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM MEDIA WHERE TenTep = N'ca-tru-audio.mp3')
    BEGIN
        INSERT INTO MEDIA
        (
            LoaiMedia, TenTep, DuongDanTep, NhaCungCapLuuTru, MimeType,
            KichThuocBytes, ThoiLuongGiay, ChuSoHuuBanQuyen, ThongTinGiayPhep,
            TrangThai, IDNguoiTaiLen
        )
        VALUES
        (
            'AM_THANH', N'ca-tru-audio.mp3', N'/media/ca-tru-audio.mp3', N'local',
            N'audio/mpeg', 3200000, 95, N'VNCultureBridge AI',
            N'Demo license', 'NHAP', @ContentAdminId
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM MEDIA WHERE TenTep = N'nha-rong-tay-nguyen.jpg')
    BEGIN
        INSERT INTO MEDIA
        (
            LoaiMedia, TenTep, DuongDanTep, NhaCungCapLuuTru, MimeType,
            KichThuocBytes, RongPx, CaoPx, ChuSoHuuBanQuyen, ThongTinGiayPhep,
            TrangThai, IDNguoiTaiLen
        )
        VALUES
        (
            'HINH_ANH', N'nha-rong-tay-nguyen.jpg', N'/media/nha-rong-tay-nguyen.jpg', N'local',
            N'image/jpeg', 256000, 1500, 1000, N'VNCultureBridge AI',
            N'Demo license', 'NHAP', @ContentAdminId
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM MEDIA WHERE TenTep = N'pho-viet-nam.jpg')
    BEGIN
        INSERT INTO MEDIA
        (
            LoaiMedia, TenTep, DuongDanTep, NhaCungCapLuuTru, MimeType,
            KichThuocBytes, RongPx, CaoPx, ChuSoHuuBanQuyen, ThongTinGiayPhep,
            TrangThai, IDNguoiTaiLen
        )
        VALUES
        (
            'HINH_ANH', N'pho-viet-nam.jpg', N'/media/pho-viet-nam.jpg', N'local',
            N'image/jpeg', 230000, 1600, 1066, N'VNCultureBridge AI',
            N'Demo license', 'NHAP', @ContentAdminId
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM MEDIA WHERE TenTep = N'cong-chieng-video.mp4')
    BEGIN
        INSERT INTO MEDIA
        (
            LoaiMedia, TenTep, DuongDanTep, NhaCungCapLuuTru, MimeType,
            KichThuocBytes, RongPx, CaoPx, ThoiLuongGiay, ChuSoHuuBanQuyen, ThongTinGiayPhep,
            TrangThai, IDNguoiTaiLen
        )
        VALUES
        (
            'VIDEO', N'cong-chieng-video.mp4', N'/media/cong-chieng-video.mp4', N'local',
            N'video/mp4', 15800000, 1280, 720, 120, N'VNCultureBridge AI',
            N'Demo license', 'NHAP', @ContentAdminId
        );
    END;

    SELECT @MediaTet = IDMedia FROM MEDIA WHERE TenTep = N'tet-nguyen-dan.jpg';
    SELECT @MediaThoCung = IDMedia FROM MEDIA WHERE TenTep = N'tho-cung-to-tien.jpg';
    SELECT @MediaAoDai = IDMedia FROM MEDIA WHERE TenTep = N'ao-dai-viet-nam.jpg';
    SELECT @MediaCaTru = IDMedia FROM MEDIA WHERE TenTep = N'ca-tru-audio.mp3';
    SELECT @MediaNhaRong = IDMedia FROM MEDIA WHERE TenTep = N'nha-rong-tay-nguyen.jpg';
    SELECT @MediaPho = IDMedia FROM MEDIA WHERE TenTep = N'pho-viet-nam.jpg';
    SELECT @MediaCongChieng = IDMedia FROM MEDIA WHERE TenTep = N'cong-chieng-video.mp4';

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT @MediaTet, 'vi', N'Ảnh minh hoạ Tết Nguyên Đán', N'Không khí sum họp dịp đầu năm'
    WHERE NOT EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @MediaTet AND MaNgonNgu = 'vi');

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT @MediaTet, 'en', N'Tet holiday illustration', N'Family reunion during the new lunar year'
    WHERE NOT EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @MediaTet AND MaNgonNgu = 'en');

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT @MediaThoCung, 'vi', N'Bàn thờ gia tiên trong gia đình Việt', N'Không gian thờ cúng tổ tiên'
    WHERE NOT EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @MediaThoCung AND MaNgonNgu = 'vi');

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT @MediaThoCung, 'en', N'An ancestral altar in a Vietnamese home', N'Ancestor worship space'
    WHERE NOT EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @MediaThoCung AND MaNgonNgu = 'en');

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT @MediaAoDai, 'vi', N'Người mặc áo dài truyền thống', N'Áo dài trong bối cảnh văn hoá hiện đại'
    WHERE NOT EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @MediaAoDai AND MaNgonNgu = 'vi');

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT @MediaAoDai, 'en', N'Vietnamese traditional ao dai costume', N'Ao dai in modern cultural contexts'
    WHERE NOT EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @MediaAoDai AND MaNgonNgu = 'en');

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT @MediaCaTru, 'vi', N'Tệp âm thanh minh hoạ ca trù', N'Một đoạn trình diễn ca trù'
    WHERE NOT EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @MediaCaTru AND MaNgonNgu = 'vi');

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT @MediaCaTru, 'en', N'Audio sample of ca tru', N'A short ca tru performance clip'
    WHERE NOT EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @MediaCaTru AND MaNgonNgu = 'en');

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT @MediaNhaRong, 'vi', N'Hình ảnh nhà rông Tây Nguyên', N'Nhà rông gắn với sinh hoạt cộng đồng'
    WHERE NOT EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @MediaNhaRong AND MaNgonNgu = 'vi');

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT @MediaNhaRong, 'en', N'Communal stilt house in the Central Highlands', N'An elevated communal house'
    WHERE NOT EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @MediaNhaRong AND MaNgonNgu = 'en');

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT @MediaPho, 'vi', N'Bát phở truyền thống Việt Nam', N'Phở như một biểu tượng ẩm thực'
    WHERE NOT EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @MediaPho AND MaNgonNgu = 'vi');

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT @MediaPho, 'en', N'A bowl of traditional Vietnamese pho', N'Pho as a culinary symbol'
    WHERE NOT EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @MediaPho AND MaNgonNgu = 'en');

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT @MediaCongChieng, 'vi', N'Video cồng chiêng Tây Nguyên', N'Trình diễn cồng chiêng trong không gian cộng đồng'
    WHERE NOT EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @MediaCongChieng AND MaNgonNgu = 'vi');

    INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
    SELECT @MediaCongChieng, 'en', N'Central Highlands gong culture video', N'Gong performance in a communal space'
    WHERE NOT EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @MediaCongChieng AND MaNgonNgu = 'en');

    /* =========================================================
       9. BAI VIET
       ========================================================= */

    /* ---------- Bai 1: Tet ---------- */
    IF NOT EXISTS (SELECT 1 FROM BAI_VIET WHERE DuongDanSeo = N'tet-nguyen-dan-viet-nam')
    BEGIN
        INSERT INTO BAI_VIET
        (
            DuongDanSeo, MaNgonNguGoc, LoaiBaiViet, TrangThai,
            NoiDungNoiBat, CapDoNhayCam, MucDoKiemDuyet,
            GhiChuBienTap, IDNguoiTao, IDNguoiCapNhat
        )
        VALUES
        (
            N'tet-nguyen-dan-viet-nam', 'vi', 'LE_HOI', 'NHAP',
            1, 1, 'THUONG',
            N'Bài viết nền tảng cho chủ đề Tết', @ContentAdminId, @ContentAdminId
        );
    END;

    SELECT @BaiTet = IDBaiViet FROM BAI_VIET WHERE DuongDanSeo = N'tet-nguyen-dan-viet-nam';

    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay,
        TrangThaiBanDich, IDNguoiSoat, NgaySoat, GhiChuDichGia
    )
    SELECT
        @BaiTet, 'vi',
        N'Tết Nguyên Đán ở Việt Nam',
        N'Lễ hội quan trọng nhất trong năm, gắn với sum họp, tưởng nhớ tổ tiên và khởi đầu mới.',
        N'Tết Nguyên Đán là thời điểm chuyển giao giữa năm cũ và năm mới âm lịch trong văn hoá Việt Nam.',
        N'Tết phát triển trong bối cảnh văn minh nông nghiệp lúa nước, gắn với chu kỳ mùa vụ và đời sống gia đình.',
        N'Tết thể hiện tinh thần đoàn tụ, lòng biết ơn với tổ tiên và niềm hy vọng vào một năm mới tốt lành.',
        N'Tết được thực hành rộng rãi ở nhiều vùng của Việt Nam với những biến thể phong tục địa phương.',
        N'Trong dịp Tết, người Việt thường dọn dẹp nhà cửa, chuẩn bị mâm cúng, thăm hỏi họ hàng, chúc Tết và sum họp gia đình. Nhiều biểu tượng như bánh chưng, câu đối đỏ, lì xì và mâm ngũ quả đều phản ánh các lớp ý nghĩa văn hoá khác nhau. Tết không chỉ là ngày nghỉ mà còn là dịp tái khẳng định mối liên hệ giữa cá nhân, gia đình và cộng đồng.',
        N'Nhiều du khách nước ngoài bất ngờ vì cửa hàng đóng cửa trong những ngày đầu năm hoặc vì nghi thức chúc Tết có tính trang trọng.',
        N'tet-nguyen-dan-viet-nam',
        N'Giải thích ý nghĩa văn hoá của Tết Nguyên Đán trong đời sống người Việt.',
        7, 0, 'DA_DUYET', @ReviewerId, SYSUTCDATETIME(), N'Đã soát và chuẩn hoá cách diễn giải.'
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_BAN_DICH WHERE IDBaiViet = @BaiTet AND MaNgonNgu = 'vi'
    );

    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay,
        TrangThaiBanDich, IDNguoiSoat, NgaySoat, GhiChuDichGia
    )
    SELECT
        @BaiTet, 'en',
        N'Tet Nguyen Dan in Vietnam',
        N'The most important annual celebration in Vietnam, centered on reunion, remembrance, and renewal.',
        N'Tet Nguyen Dan marks the transition from the old lunar year to the new one in Vietnamese culture.',
        N'Its roots are associated with agrarian life, seasonal cycles, and family-centered social structure.',
        N'Tet reflects family reunion, gratitude toward ancestors, and hopes for prosperity in the new year.',
        N'It is widely observed across Vietnam, although local customs may vary by region.',
        N'During Tet, Vietnamese families clean their homes, prepare offerings, visit relatives, exchange greetings, and share festive meals. Symbols such as lucky money, red decorations, and traditional dishes reveal the social and spiritual dimensions of the holiday. Tet is both a celebration and a cultural framework for renewing family and community bonds.',
        N'Visitors may need context to understand why many services pause and why ritual gestures matter during these days.',
        N'tet-nguyen-dan-in-vietnam',
        N'Explore the cultural meaning of Tet Nguyen Dan in Vietnamese life.',
        7, 0, 'DA_DUYET', @ReviewerId, SYSUTCDATETIME(), N'Human-reviewed bilingual version.'
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_BAN_DICH WHERE IDBaiViet = @BaiTet AND MaNgonNgu = 'en'
    );

    /* ---------- Bai 2: Tho cung to tien ---------- */
    IF NOT EXISTS (SELECT 1 FROM BAI_VIET WHERE DuongDanSeo = N'tho-cung-to-tien-viet-nam')
    BEGIN
        INSERT INTO BAI_VIET
        (
            DuongDanSeo, MaNgonNguGoc, LoaiBaiViet, TrangThai,
            NoiDungNoiBat, CapDoNhayCam, MucDoKiemDuyet,
            GhiChuBienTap, IDNguoiTao, IDNguoiCapNhat
        )
        VALUES
        (
            N'tho-cung-to-tien-viet-nam', 'vi', 'TIN_NGUONG', 'NHAP',
            1, 2, 'THUONG',
            N'Bài viết giải thích tín ngưỡng phổ biến trong gia đình Việt', @ContentAdminId, @ContentAdminId
        );
    END;

    SELECT @BaiThoCung = IDBaiViet FROM BAI_VIET WHERE DuongDanSeo = N'tho-cung-to-tien-viet-nam';

    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay,
        TrangThaiBanDich, IDNguoiSoat, NgaySoat
    )
    SELECT
        @BaiThoCung, 'vi',
        N'Tục thờ cúng tổ tiên trong văn hoá Việt',
        N'Một thực hành tín ngưỡng gắn với đạo hiếu, ký ức gia đình và sự tiếp nối giữa các thế hệ.',
        N'Thờ cúng tổ tiên là nét phổ biến trong đời sống tinh thần của nhiều gia đình Việt Nam.',
        N'Tục này hình thành từ niềm tin rằng người đã khuất vẫn hiện diện về mặt tinh thần trong gia đình và cộng đồng.',
        N'Nó thể hiện lòng biết ơn, đạo hiếu và trách nhiệm gìn giữ mối liên kết gia đình qua thời gian.',
        N'Thực hành này thường xuất hiện vào ngày giỗ, Tết, dịp cưới hỏi, khai trương hoặc những thời điểm quan trọng của gia đình.',
        N'Trong nhiều gia đình Việt, bàn thờ gia tiên là không gian linh thiêng đặt ở vị trí trang trọng. Nghi thức dâng hương, dâng lễ và tưởng niệm không chỉ mang ý nghĩa tâm linh mà còn là một cách giáo dục con cháu về cội nguồn. Việc thờ cúng tổ tiên vì thế vừa là sinh hoạt tín ngưỡng vừa là hình thức duy trì ký ức văn hoá gia đình.',
        N'Người nước ngoài có thể hiểu nhầm đây chỉ là nghi thức tôn giáo, trong khi với nhiều gia đình Việt nó còn là thực hành văn hoá và đạo đức.',
        N'tho-cung-to-tien-viet-nam',
        N'Giải thích tín ngưỡng thờ cúng tổ tiên trong bối cảnh gia đình Việt Nam.',
        6, 0, 'DA_DUYET', @ReviewerId, SYSUTCDATETIME()
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_BAN_DICH WHERE IDBaiViet = @BaiThoCung AND MaNgonNgu = 'vi'
    );

    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay,
        TrangThaiBanDich, IDNguoiSoat, NgaySoat
    )
    SELECT
        @BaiThoCung, 'en',
        N'Ancestor worship in Vietnamese culture',
        N'A common cultural practice associated with filial piety, memory, and family continuity.',
        N'Ancestor worship is an important spiritual and cultural practice in many Vietnamese families.',
        N'It is rooted in the belief that the deceased remain spiritually connected to the living.',
        N'It expresses gratitude, filial piety, and continuity between generations.',
        N'It is often observed during death anniversaries, Tet, household ceremonies, and major family milestones.',
        N'In many homes, the ancestral altar functions as a sacred family space. Offering incense and food is not only a ritual act but also a way of remembering lineage and affirming moral responsibility toward previous generations. This practice therefore combines spirituality, family memory, and cultural identity.',
        N'Foreign readers may need clarification that this practice is often cultural and familial, not merely doctrinal.',
        N'ancestor-worship-in-vietnamese-culture',
        N'Understand the cultural meaning of ancestor worship in Vietnam.',
        6, 0, 'DA_DUYET', @ReviewerId, SYSUTCDATETIME()
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_BAN_DICH WHERE IDBaiViet = @BaiThoCung AND MaNgonNgu = 'en'
    );

    /* ---------- Bai 3: Ao dai ---------- */
    IF NOT EXISTS (SELECT 1 FROM BAI_VIET WHERE DuongDanSeo = N'ao-dai-viet-nam')
    BEGIN
        INSERT INTO BAI_VIET
        (
            DuongDanSeo, MaNgonNguGoc, LoaiBaiViet, TrangThai,
            NoiDungNoiBat, CapDoNhayCam, MucDoKiemDuyet,
            GhiChuBienTap, IDNguoiTao, IDNguoiCapNhat
        )
        VALUES
        (
            N'ao-dai-viet-nam', 'vi', 'TRANG_PHUC', 'NHAP',
            1, 1, 'THUONG',
            N'Bài viết biểu tượng văn hoá về áo dài', @ContentAdminId, @ContentAdminId
        );
    END;

    SELECT @BaiAoDai = IDBaiViet FROM BAI_VIET WHERE DuongDanSeo = N'ao-dai-viet-nam';

    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay,
        TrangThaiBanDich, IDNguoiSoat, NgaySoat
    )
    SELECT
        @BaiAoDai, 'vi',
        N'Áo dài trong văn hoá Việt Nam',
        N'Trang phục biểu tượng vừa truyền thống vừa hiện đại của người Việt.',
        N'Áo dài là một trong những hình ảnh nhận diện nổi bật nhất của văn hoá Việt Nam.',
        N'Hình thức áo dài hiện nay là kết quả của quá trình biến đổi lịch sử và thẩm mỹ qua nhiều giai đoạn.',
        N'Áo dài thường được xem là biểu tượng của sự thanh lịch, duyên dáng và bản sắc văn hoá Việt.',
        N'Áo dài xuất hiện trong trường học, lễ hội, cưới hỏi, ngoại giao văn hoá và nhiều sự kiện trang trọng.',
        N'Dù có nhiều biến thể thiết kế, áo dài vẫn giữ một vị trí đặc biệt trong tưởng tượng văn hoá về Việt Nam. Việc mặc áo dài không chỉ là lựa chọn thẩm mỹ mà còn có thể là hành vi biểu đạt danh tính, sự trân trọng truyền thống và ý thức đại diện cho văn hoá dân tộc trong bối cảnh hiện đại.',
        N'Người nước ngoài dễ nghĩ áo dài chỉ là “quốc phục nữ”, nhưng trên thực tế áo dài có nhiều biến thể, nhiều ngữ cảnh sử dụng và cả phiên bản nam.',
        N'ao-dai-viet-nam',
        N'Khám phá ý nghĩa văn hoá của áo dài Việt Nam.',
        5, 0, 'DA_DUYET', @ReviewerId, SYSUTCDATETIME()
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_BAN_DICH WHERE IDBaiViet = @BaiAoDai AND MaNgonNgu = 'vi'
    );

    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay,
        TrangThaiBanDich, IDNguoiSoat, NgaySoat
    )
    SELECT
        @BaiAoDai, 'en',
        N'Ao dai in Vietnamese culture',
        N'A cultural symbol that combines elegance, continuity, and modern identity.',
        N'The ao dai is one of the most recognizable visual symbols of Vietnam.',
        N'Its current form is the result of historical transformations in design and social meaning.',
        N'It is often associated with elegance, grace, and cultural representation.',
        N'Ao dai is worn in schools, festivals, weddings, diplomatic events, and cultural performances.',
        N'Although designs continue to evolve, the ao dai remains deeply connected to ideas of Vietnamese identity. Wearing it may express respect for tradition, participation in ceremonial life, or the desire to present a culturally meaningful image in contemporary settings.',
        N'International audiences may assume it is only a women’s costume, but the history and practice of ao dai are more diverse.',
        N'ao-dai-in-vietnamese-culture',
        N'Learn why the ao dai is a major symbol of Vietnamese culture.',
        5, 0, 'DA_DUYET', @ReviewerId, SYSUTCDATETIME()
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_BAN_DICH WHERE IDBaiViet = @BaiAoDai AND MaNgonNgu = 'en'
    );

    /* ---------- Bai 4: Ca tru ---------- */
    IF NOT EXISTS (SELECT 1 FROM BAI_VIET WHERE DuongDanSeo = N'ca-tru-viet-nam')
    BEGIN
        INSERT INTO BAI_VIET
        (
            DuongDanSeo, MaNgonNguGoc, LoaiBaiViet, TrangThai,
            NoiDungNoiBat, CapDoNhayCam, MucDoKiemDuyet,
            GhiChuBienTap, IDNguoiTao, IDNguoiCapNhat
        )
        VALUES
        (
            N'ca-tru-viet-nam', 'vi', 'NGHE_THUAT_DAN_GIAN', 'NHAP',
            0, 1, 'THUONG',
            N'Bài viết giới thiệu ca trù và bối cảnh biểu diễn', @ContentAdminId, @ContentAdminId
        );
    END;

    SELECT @BaiCaTru = IDBaiViet FROM BAI_VIET WHERE DuongDanSeo = N'ca-tru-viet-nam';

    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay,
        TrangThaiBanDich, IDNguoiSoat, NgaySoat
    )
    SELECT
        @BaiCaTru, 'vi',
        N'Ca trù trong đời sống nghệ thuật dân gian Việt Nam',
        N'Một loại hình diễn xướng giàu tính thẩm mỹ và chiều sâu ngữ nghĩa ở miền Bắc Việt Nam.',
        N'Ca trù là loại hình biểu diễn kết hợp giữa thơ ca, giọng hát và nhạc cụ gõ dây đặc trưng.',
        N'Nó gắn với không gian thưởng thức mang tính chọn lọc và truyền thống lâu đời.',
        N'Ca trù thể hiện sự tinh tế trong cảm thụ nghệ thuật, ngôn ngữ và nhịp điệu.',
        N'Ca trù xuất hiện trong các không gian hát thờ, hát chơi và nhiều bối cảnh trình diễn truyền thống.',
        N'Điểm đặc biệt của ca trù không chỉ nằm ở giai điệu mà còn ở mối quan hệ giữa lời thơ, nhịp phách, tiếng đàn và cách thưởng thức. Người nghe thường cần một mức độ tập trung cao hơn để cảm nhận vẻ đẹp tiết chế, tao nhã và giàu tính ước lệ của loại hình này.',
        N'Người nghe quốc tế có thể thấy ca trù “khó tiếp cận” nếu thiếu giải thích về cấu trúc và cách nghe.',
        N'ca-tru-viet-nam',
        N'Giới thiệu ca trù như một loại hình nghệ thuật dân gian giàu chiều sâu.',
        6, 0, 'DA_DUYET', @ReviewerId, SYSUTCDATETIME()
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_BAN_DICH WHERE IDBaiViet = @BaiCaTru AND MaNgonNgu = 'vi'
    );

    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay,
        TrangThaiBanDich, IDNguoiSoat, NgaySoat
    )
    SELECT
        @BaiCaTru, 'en',
        N'Ca tru in Vietnamese folk performance culture',
        N'A refined form of Northern Vietnamese performance art built on poetry, voice, and rhythm.',
        N'Ca tru is a performance genre that combines sung poetry, percussion patterns, and instrumental accompaniment.',
        N'It is associated with selective listening spaces and a long historical tradition.',
        N'Ca tru reveals a sophisticated relationship between language, rhythm, and aesthetic restraint.',
        N'It has been practiced in ritual, literary, and intimate performance contexts.',
        N'The richness of ca tru lies not only in melody but also in the interaction between poetic text, vocal delivery, instrumental texture, and listening etiquette. Many first-time listeners need cultural guidance to appreciate its subtle structure and emotional discipline.',
        N'Without explanation, international listeners may underestimate the genre because it does not follow familiar pop or theatrical patterns.',
        N'ca-tru-in-vietnamese-culture',
        N'Understand ca tru as a refined Vietnamese performance tradition.',
        6, 0, 'DA_DUYET', @ReviewerId, SYSUTCDATETIME()
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_BAN_DICH WHERE IDBaiViet = @BaiCaTru AND MaNgonNgu = 'en'
    );

    /* ---------- Bai 5: Nha rong ---------- */
    IF NOT EXISTS (SELECT 1 FROM BAI_VIET WHERE DuongDanSeo = N'nha-rong-tay-nguyen')
    BEGIN
        INSERT INTO BAI_VIET
        (
            DuongDanSeo, MaNgonNguGoc, LoaiBaiViet, TrangThai,
            NoiDungNoiBat, CapDoNhayCam, MucDoKiemDuyet,
            GhiChuBienTap, IDNguoiTao, IDNguoiCapNhat
        )
        VALUES
        (
            N'nha-rong-tay-nguyen', 'vi', 'KIEN_TRUC', 'NHAP',
            0, 2, 'THUONG',
            N'Bài viết giới thiệu kiến trúc và chức năng cộng đồng của nhà rông', @ContentAdminId, @ContentAdminId
        );
    END;

    SELECT @BaiNhaRong = IDBaiViet FROM BAI_VIET WHERE DuongDanSeo = N'nha-rong-tay-nguyen';

    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay,
        TrangThaiBanDich, IDNguoiSoat, NgaySoat
    )
    SELECT
        @BaiNhaRong, 'vi',
        N'Nhà rông trong không gian văn hoá Tây Nguyên',
        N'Một kiến trúc cộng đồng tiêu biểu phản ánh tổ chức xã hội và đời sống nghi lễ của nhiều dân tộc Tây Nguyên.',
        N'Nhà rông là công trình kiến trúc cộng đồng nổi bật trong nhiều buôn làng Tây Nguyên.',
        N'Nó hình thành gắn với cấu trúc buôn làng, đời sống cộng đồng và các sinh hoạt lễ nghi truyền thống.',
        N'Nhà rông biểu trưng cho tính cộng đồng, quyền uy tập thể và sự gắn kết của buôn làng.',
        N'Đây là nơi diễn ra hội họp, tiếp khách, tổ chức nghi lễ và lưu giữ nhiều giá trị văn hoá truyền thống.',
        N'Hình dáng mái cao, không gian mở và vị trí trung tâm khiến nhà rông trở thành điểm nhấn thị giác và biểu tượng xã hội trong làng. Ý nghĩa của nhà rông không chỉ nằm ở mặt kiến trúc mà còn ở vai trò như một trung tâm sinh hoạt chung, nơi các chuẩn mực cộng đồng được duy trì và truyền lại.',
        N'Du khách không nên xem nhà rông chỉ là “điểm check-in”, vì với cộng đồng bản địa nó gắn với trật tự xã hội và ký ức văn hoá.',
        N'nha-rong-tay-nguyen',
        N'Giới thiệu kiến trúc nhà rông và ý nghĩa cộng đồng ở Tây Nguyên.',
        5, 0, 'DA_DUYET', @ReviewerId, SYSUTCDATETIME()
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_BAN_DICH WHERE IDBaiViet = @BaiNhaRong AND MaNgonNgu = 'vi'
    );

    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay,
        TrangThaiBanDich, IDNguoiSoat, NgaySoat
    )
    SELECT
        @BaiNhaRong, 'en',
        N'The communal stilt house in the Central Highlands',
        N'A community structure that reflects social organization and ceremonial life in the Central Highlands.',
        N'The communal stilt house is a major architectural symbol in many villages of the Central Highlands.',
        N'It developed in close relation to village structure, ritual life, and collective social practices.',
        N'It represents community, authority, and shared cultural memory.',
        N'It functions as a venue for meetings, ceremonies, hospitality, and intergenerational exchange.',
        N'Its dramatic roofline and central location make it visually distinctive, but its deeper importance lies in its role as a communal institution. It is a place where social norms, rituals, and stories are rehearsed and preserved.',
        N'International visitors may overlook its social significance if they interpret it only as vernacular architecture.',
        N'communal-stilt-house-central-highlands',
        N'Learn the meaning of the communal stilt house in the Central Highlands.',
        5, 0, 'DA_DUYET', @ReviewerId, SYSUTCDATETIME()
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_BAN_DICH WHERE IDBaiViet = @BaiNhaRong AND MaNgonNgu = 'en'
    );

    /* ---------- Bai 6: Pho ---------- */
    IF NOT EXISTS (SELECT 1 FROM BAI_VIET WHERE DuongDanSeo = N'pho-viet-nam')
    BEGIN
        INSERT INTO BAI_VIET
        (
            DuongDanSeo, MaNgonNguGoc, LoaiBaiViet, TrangThai,
            NoiDungNoiBat, CapDoNhayCam, MucDoKiemDuyet,
            GhiChuBienTap, IDNguoiTao, IDNguoiCapNhat
        )
        VALUES
        (
            N'pho-viet-nam', 'vi', 'AM_THUC', 'NHAP',
            1, 1, 'THUONG',
            N'Bài viết chủ lực về biểu tượng ẩm thực Việt Nam', @ContentAdminId, @ContentAdminId
        );
    END;

    SELECT @BaiPho = IDBaiViet FROM BAI_VIET WHERE DuongDanSeo = N'pho-viet-nam';

    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay,
        TrangThaiBanDich, IDNguoiSoat, NgaySoat
    )
    SELECT
        @BaiPho, 'vi',
        N'Phở trong văn hoá ẩm thực Việt Nam',
        N'Một món ăn biểu tượng thể hiện thói quen, khẩu vị và ký ức ẩm thực của người Việt.',
        N'Phở là một trong những món ăn nổi tiếng nhất của Việt Nam trong và ngoài nước.',
        N'Phở phát triển trong bối cảnh giao thoa giữa nhiều truyền thống ẩm thực và đời sống đô thị.',
        N'Phở không chỉ là món ăn mà còn là biểu tượng về sự quen thuộc, tiện lợi và niềm tự hào ẩm thực.',
        N'Phở được ăn vào nhiều thời điểm trong ngày và có nhiều biến thể vùng miền.',
        N'Sức sống văn hoá của phở nằm ở chỗ món ăn này vừa phổ biến vừa có khả năng gợi ký ức cá nhân và ký ức tập thể. Từ quán vỉa hè đến nhà hàng quốc tế, phở xuất hiện trong nhiều không gian xã hội khác nhau và thường được xem như một cách “nếm” Việt Nam đối với người nước ngoài.',
        N'Khách quốc tế thường quen với một kiểu phở nhất định, nhưng trong thực tế gia vị, nước dùng và thói quen ăn phở rất đa dạng.',
        N'pho-viet-nam',
        N'Giải thích vì sao phở trở thành biểu tượng ẩm thực Việt Nam.',
        5, 0, 'DA_DUYET', @ReviewerId, SYSUTCDATETIME()
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_BAN_DICH WHERE IDBaiViet = @BaiPho AND MaNgonNgu = 'vi'
    );

    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay,
        TrangThaiBanDich, IDNguoiSoat, NgaySoat
    )
    SELECT
        @BaiPho, 'en',
        N'Pho in Vietnamese culinary culture',
        N'A signature dish that carries everyday familiarity, regional diversity, and culinary identity.',
        N'Pho is one of the best-known Vietnamese dishes both domestically and internationally.',
        N'It emerged through culinary exchange, urban life, and evolving taste preferences.',
        N'Pho represents comfort, accessibility, and national culinary pride.',
        N'It can be eaten at different times of day and appears in many regional styles.',
        N'Pho is culturally powerful because it is both ordinary and symbolic. It can evoke home, travel, memory, and social routine all at once. For many international visitors, pho serves as an entry point into Vietnamese food culture, but its local meanings are richer than its global popularity might suggest.',
        N'Visitors often expect a single standard version of pho, yet broth style, herbs, condiments, and serving habits differ considerably.',
        N'pho-in-vietnamese-culture',
        N'Explore pho as a symbol of Vietnamese culinary culture.',
        5, 0, 'DA_DUYET', @ReviewerId, SYSUTCDATETIME()
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_BAN_DICH WHERE IDBaiViet = @BaiPho AND MaNgonNgu = 'en'
    );

    /* ---------- Bai 7: Cong chieng ---------- */
    IF NOT EXISTS (SELECT 1 FROM BAI_VIET WHERE DuongDanSeo = N'cong-chieng-tay-nguyen')
    BEGIN
        INSERT INTO BAI_VIET
        (
            DuongDanSeo, MaNgonNguGoc, LoaiBaiViet, TrangThai,
            NoiDungNoiBat, CapDoNhayCam, MucDoKiemDuyet,
            GhiChuBienTap, IDNguoiTao, IDNguoiCapNhat
        )
        VALUES
        (
            N'cong-chieng-tay-nguyen', 'vi', 'NGHE_THUAT_DAN_GIAN', 'NHAP',
            1, 2, 'THUONG',
            N'Bài viết giới thiệu không gian văn hoá cồng chiêng', @ContentAdminId, @ContentAdminId
        );
    END;

    SELECT @BaiCongChieng = IDBaiViet FROM BAI_VIET WHERE DuongDanSeo = N'cong-chieng-tay-nguyen';

    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay,
        TrangThaiBanDich, IDNguoiSoat, NgaySoat
    )
    SELECT
        @BaiCongChieng, 'vi',
        N'Không gian văn hoá cồng chiêng Tây Nguyên',
        N'Một thực hành âm nhạc - nghi lễ gắn với đời sống cộng đồng và thế giới quan của nhiều dân tộc Tây Nguyên.',
        N'Cồng chiêng là thành tố quan trọng trong nhiều nghi lễ và sinh hoạt cộng đồng ở Tây Nguyên.',
        N'Nó gắn với lịch sử làng, chu kỳ đời người, lễ hội nông nghiệp và quan niệm về thế giới linh thiêng.',
        N'Cồng chiêng thể hiện bản sắc cộng đồng, tinh thần lễ hội và mối liên hệ giữa con người với tự nhiên và thần linh.',
        N'Cồng chiêng thường xuất hiện trong lễ hội, nghi lễ vòng đời, sinh hoạt cộng đồng và các bối cảnh truyền thống quan trọng.',
        N'Khái niệm “không gian văn hoá cồng chiêng” nhấn mạnh rằng giá trị của cồng chiêng không nằm ở nhạc cụ đơn lẻ mà ở toàn bộ hệ sinh thái văn hoá bao quanh việc trình diễn: con người, cộng đồng, nghi lễ, địa điểm và ký ức tập thể. Vì vậy, cồng chiêng cần được hiểu như một thực hành sống chứ không chỉ là tiết mục biểu diễn.',
        N'Nếu chỉ xem cồng chiêng như một show diễn, người xem sẽ bỏ qua ý nghĩa nghi lễ và cộng đồng của nó.',
        N'cong-chieng-tay-nguyen',
        N'Giới thiệu ý nghĩa văn hoá của cồng chiêng Tây Nguyên.',
        6, 0, 'DA_DUYET', @ReviewerId, SYSUTCDATETIME()
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_BAN_DICH WHERE IDBaiViet = @BaiCongChieng AND MaNgonNgu = 'vi'
    );

    INSERT INTO BAI_VIET_BAN_DICH
    (
        IDBaiViet, MaNgonNgu, TieuDe, TomTat, GioiThieu, NguonGoc,
        YNghiaVanHoa, BoiCanhSuDung, NoiDungChiTiet, GhiChuCultureShock,
        TieuDeSEO, MoTaSEO, SoPhutDoc, LaBanDichMay,
        TrangThaiBanDich, IDNguoiSoat, NgaySoat
    )
    SELECT
        @BaiCongChieng, 'en',
        N'Gong culture in the Central Highlands',
        N'A ritual and musical tradition connected to communal life, memory, and cosmology.',
        N'Gongs are central to many ceremonies and festive contexts in the Central Highlands.',
        N'The practice is linked to village history, agricultural cycles, life-cycle rituals, and sacred beliefs.',
        N'Gong culture represents communal identity, ceremonial vitality, and a relationship with the spiritual world.',
        N'It is performed in festivals, village ceremonies, and other culturally significant events.',
        N'The phrase “gong culture space” highlights that the value of this tradition lies not merely in the instruments themselves, but in the broader network of people, rituals, places, and meanings that surround performance. To understand it properly, one must see it as a living cultural system.',
        N'International audiences may reduce it to stage entertainment unless ritual and community context are explained.',
        N'gong-culture-central-highlands',
        N'Understand gong culture as a living tradition in the Central Highlands.',
        6, 0, 'DA_DUYET', @ReviewerId, SYSUTCDATETIME()
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_BAN_DICH WHERE IDBaiViet = @BaiCongChieng AND MaNgonNgu = 'en'
    );

    /* =========================================================
       10. GAN DANH MUC / VUNG / DAN TOC / THE / TU KHOA / NGUON
       ========================================================= */

    /* Tet */
    INSERT INTO BAI_VIET_DANH_MUC (IDBaiViet, IDDanhMuc, LaDanhMucChinh)
    SELECT @BaiTet, d.IDDanhMuc, 1
    FROM DANH_MUC_CHU_DE d
    WHERE d.MaDanhMuc = 'LE_HOI'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_DANH_MUC WHERE IDBaiViet = @BaiTet AND IDDanhMuc = d.IDDanhMuc);

    INSERT INTO BAI_VIET_VUNG_VAN_HOA (IDBaiViet, IDVung, LoaiLienHe)
    SELECT @BaiTet, v.IDVung, 'PHO_BIEN'
    FROM VUNG_VAN_HOA v
    WHERE v.MaVung IN ('MIEN_BAC','MIEN_TRUNG','MIEN_NAM')
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_VUNG_VAN_HOA x WHERE x.IDBaiViet = @BaiTet AND x.IDVung = v.IDVung);

    INSERT INTO BAI_VIET_THE (IDBaiViet, IDThe)
    SELECT @BaiTet, t.IDThe
    FROM THE_NOI_DUNG t
    WHERE t.MaThe = 'TET'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_THE x WHERE x.IDBaiViet = @BaiTet AND x.IDThe = t.IDThe);

    INSERT INTO BAI_VIET_TU_KHOA (IDBaiViet, IDTuKhoa)
    SELECT @BaiTet, k.IDTuKhoa
    FROM TU_KHOA k
    WHERE k.MaTuKhoa = 'TET_NGUYEN_DAN'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_TU_KHOA x WHERE x.IDBaiViet = @BaiTet AND x.IDTuKhoa = k.IDTuKhoa);

    INSERT INTO BAI_VIET_NGUON_THAM_KHAO (IDBaiViet, IDNguon, GhiChuTrichDan, LaNguonChinh)
    SELECT @BaiTet, @NguonTet, N'Nguồn chính cho bài viết Tết', 1
    WHERE NOT EXISTS (SELECT 1 FROM BAI_VIET_NGUON_THAM_KHAO WHERE IDBaiViet = @BaiTet AND IDNguon = @NguonTet);

    /* Tho cung */
    INSERT INTO BAI_VIET_DANH_MUC (IDBaiViet, IDDanhMuc, LaDanhMucChinh)
    SELECT @BaiThoCung, d.IDDanhMuc, 1
    FROM DANH_MUC_CHU_DE d
    WHERE d.MaDanhMuc = 'TIN_NGUONG'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_DANH_MUC WHERE IDBaiViet = @BaiThoCung AND IDDanhMuc = d.IDDanhMuc);

    INSERT INTO BAI_VIET_VUNG_VAN_HOA (IDBaiViet, IDVung, LoaiLienHe)
    SELECT @BaiThoCung, v.IDVung, 'PHO_BIEN'
    FROM VUNG_VAN_HOA v
    WHERE v.MaVung IN ('MIEN_BAC','MIEN_TRUNG','MIEN_NAM')
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_VUNG_VAN_HOA x WHERE x.IDBaiViet = @BaiThoCung AND x.IDVung = v.IDVung);

    INSERT INTO BAI_VIET_DAN_TOC (IDBaiViet, IDDanToc, LoaiLienHe)
    SELECT @BaiThoCung, d.IDDanToc, 'PHO_BIEN'
    FROM DAN_TOC d
    WHERE d.MaDanToc = 'KINH'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_DAN_TOC x WHERE x.IDBaiViet = @BaiThoCung AND x.IDDanToc = d.IDDanToc);

    INSERT INTO BAI_VIET_THE (IDBaiViet, IDThe)
    SELECT @BaiThoCung, t.IDThe
    FROM THE_NOI_DUNG t
    WHERE t.MaThe = 'THO_CUNG_TO_TIEN'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_THE x WHERE x.IDBaiViet = @BaiThoCung AND x.IDThe = t.IDThe);

    INSERT INTO BAI_VIET_TU_KHOA (IDBaiViet, IDTuKhoa)
    SELECT @BaiThoCung, k.IDTuKhoa
    FROM TU_KHOA k
    WHERE k.MaTuKhoa = 'ANCESTOR_WORSHIP'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_TU_KHOA x WHERE x.IDBaiViet = @BaiThoCung AND x.IDTuKhoa = k.IDTuKhoa);

    INSERT INTO BAI_VIET_NGUON_THAM_KHAO (IDBaiViet, IDNguon, GhiChuTrichDan, LaNguonChinh)
    SELECT @BaiThoCung, @NguonThoCung, N'Nguồn chính cho bài viết thờ cúng tổ tiên', 1
    WHERE NOT EXISTS (SELECT 1 FROM BAI_VIET_NGUON_THAM_KHAO WHERE IDBaiViet = @BaiThoCung AND IDNguon = @NguonThoCung);

    /* Ao dai */
    INSERT INTO BAI_VIET_DANH_MUC (IDBaiViet, IDDanhMuc, LaDanhMucChinh)
    SELECT @BaiAoDai, d.IDDanhMuc, 1
    FROM DANH_MUC_CHU_DE d
    WHERE d.MaDanhMuc = 'TRANG_PHUC'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_DANH_MUC WHERE IDBaiViet = @BaiAoDai AND IDDanhMuc = d.IDDanhMuc);

    INSERT INTO BAI_VIET_VUNG_VAN_HOA (IDBaiViet, IDVung, LoaiLienHe)
    SELECT @BaiAoDai, v.IDVung, 'LIEN_QUAN'
    FROM VUNG_VAN_HOA v
    WHERE v.MaVung IN ('MIEN_TRUNG','MIEN_NAM')
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_VUNG_VAN_HOA x WHERE x.IDBaiViet = @BaiAoDai AND x.IDVung = v.IDVung);

    INSERT INTO BAI_VIET_THE (IDBaiViet, IDThe)
    SELECT @BaiAoDai, t.IDThe
    FROM THE_NOI_DUNG t
    WHERE t.MaThe = 'AO_DAI'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_THE x WHERE x.IDBaiViet = @BaiAoDai AND x.IDThe = t.IDThe);

    INSERT INTO BAI_VIET_TU_KHOA (IDBaiViet, IDTuKhoa)
    SELECT @BaiAoDai, k.IDTuKhoa
    FROM TU_KHOA k
    WHERE k.MaTuKhoa = 'AO_DAI'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_TU_KHOA x WHERE x.IDBaiViet = @BaiAoDai AND x.IDTuKhoa = k.IDTuKhoa);

    INSERT INTO BAI_VIET_NGUON_THAM_KHAO (IDBaiViet, IDNguon, GhiChuTrichDan, LaNguonChinh)
    SELECT @BaiAoDai, @NguonAoDai, N'Nguồn chính cho bài viết áo dài', 1
    WHERE NOT EXISTS (SELECT 1 FROM BAI_VIET_NGUON_THAM_KHAO WHERE IDBaiViet = @BaiAoDai AND IDNguon = @NguonAoDai);

    /* Ca tru */
    INSERT INTO BAI_VIET_DANH_MUC (IDBaiViet, IDDanhMuc, LaDanhMucChinh)
    SELECT @BaiCaTru, d.IDDanhMuc, 1
    FROM DANH_MUC_CHU_DE d
    WHERE d.MaDanhMuc = 'NGHE_THUAT_DAN_GIAN'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_DANH_MUC WHERE IDBaiViet = @BaiCaTru AND IDDanhMuc = d.IDDanhMuc);

    INSERT INTO BAI_VIET_VUNG_VAN_HOA (IDBaiViet, IDVung, LoaiLienHe)
    SELECT @BaiCaTru, v.IDVung, 'NGUON_GOC'
    FROM VUNG_VAN_HOA v
    WHERE v.MaVung = 'MIEN_BAC'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_VUNG_VAN_HOA x WHERE x.IDBaiViet = @BaiCaTru AND x.IDVung = v.IDVung);

    INSERT INTO BAI_VIET_THE (IDBaiViet, IDThe)
    SELECT @BaiCaTru, t.IDThe
    FROM THE_NOI_DUNG t
    WHERE t.MaThe = 'CA_TRU'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_THE x WHERE x.IDBaiViet = @BaiCaTru AND x.IDThe = t.IDThe);

    INSERT INTO BAI_VIET_TU_KHOA (IDBaiViet, IDTuKhoa)
    SELECT @BaiCaTru, k.IDTuKhoa
    FROM TU_KHOA k
    WHERE k.MaTuKhoa = 'CA_TRU'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_TU_KHOA x WHERE x.IDBaiViet = @BaiCaTru AND x.IDTuKhoa = k.IDTuKhoa);

    INSERT INTO BAI_VIET_NGUON_THAM_KHAO (IDBaiViet, IDNguon, GhiChuTrichDan, LaNguonChinh)
    SELECT @BaiCaTru, @NguonCaTru, N'Nguồn chính cho bài viết ca trù', 1
    WHERE NOT EXISTS (SELECT 1 FROM BAI_VIET_NGUON_THAM_KHAO WHERE IDBaiViet = @BaiCaTru AND IDNguon = @NguonCaTru);

    /* Nha rong */
    INSERT INTO BAI_VIET_DANH_MUC (IDBaiViet, IDDanhMuc, LaDanhMucChinh)
    SELECT @BaiNhaRong, d.IDDanhMuc, 1
    FROM DANH_MUC_CHU_DE d
    WHERE d.MaDanhMuc = 'KIEN_TRUC'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_DANH_MUC WHERE IDBaiViet = @BaiNhaRong AND IDDanhMuc = d.IDDanhMuc);

    INSERT INTO BAI_VIET_VUNG_VAN_HOA (IDBaiViet, IDVung, LoaiLienHe)
    SELECT @BaiNhaRong, v.IDVung, 'NGUON_GOC'
    FROM VUNG_VAN_HOA v
    WHERE v.MaVung = 'TAY_NGUYEN'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_VUNG_VAN_HOA x WHERE x.IDBaiViet = @BaiNhaRong AND x.IDVung = v.IDVung);

    INSERT INTO BAI_VIET_DAN_TOC (IDBaiViet, IDDanToc, LoaiLienHe)
    SELECT @BaiNhaRong, d.IDDanToc, 'LIEN_QUAN'
    FROM DAN_TOC d
    WHERE d.MaDanToc = 'EDE'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_DAN_TOC x WHERE x.IDBaiViet = @BaiNhaRong AND x.IDDanToc = d.IDDanToc);

    INSERT INTO BAI_VIET_THE (IDBaiViet, IDThe)
    SELECT @BaiNhaRong, t.IDThe
    FROM THE_NOI_DUNG t
    WHERE t.MaThe = 'NHA_RONG'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_THE x WHERE x.IDBaiViet = @BaiNhaRong AND x.IDThe = t.IDThe);

    INSERT INTO BAI_VIET_TU_KHOA (IDBaiViet, IDTuKhoa)
    SELECT @BaiNhaRong, k.IDTuKhoa
    FROM TU_KHOA k
    WHERE k.MaTuKhoa = 'NHA_RONG'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_TU_KHOA x WHERE x.IDBaiViet = @BaiNhaRong AND x.IDTuKhoa = k.IDTuKhoa);

    INSERT INTO BAI_VIET_NGUON_THAM_KHAO (IDBaiViet, IDNguon, GhiChuTrichDan, LaNguonChinh)
    SELECT @BaiNhaRong, @NguonNhaRong, N'Nguồn chính cho bài viết nhà rông', 1
    WHERE NOT EXISTS (SELECT 1 FROM BAI_VIET_NGUON_THAM_KHAO WHERE IDBaiViet = @BaiNhaRong AND IDNguon = @NguonNhaRong);

    /* Pho */
    INSERT INTO BAI_VIET_DANH_MUC (IDBaiViet, IDDanhMuc, LaDanhMucChinh)
    SELECT @BaiPho, d.IDDanhMuc, 1
    FROM DANH_MUC_CHU_DE d
    WHERE d.MaDanhMuc = 'AM_THUC'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_DANH_MUC WHERE IDBaiViet = @BaiPho AND IDDanhMuc = d.IDDanhMuc);

    INSERT INTO BAI_VIET_VUNG_VAN_HOA (IDBaiViet, IDVung, LoaiLienHe)
    SELECT @BaiPho, v.IDVung, 'PHO_BIEN'
    FROM VUNG_VAN_HOA v
    WHERE v.MaVung IN ('MIEN_BAC','MIEN_NAM')
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_VUNG_VAN_HOA x WHERE x.IDBaiViet = @BaiPho AND x.IDVung = v.IDVung);

    INSERT INTO BAI_VIET_DAN_TOC (IDBaiViet, IDDanToc, LoaiLienHe)
    SELECT @BaiPho, d.IDDanToc, 'PHO_BIEN'
    FROM DAN_TOC d
    WHERE d.MaDanToc = 'KINH'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_DAN_TOC x WHERE x.IDBaiViet = @BaiPho AND x.IDDanToc = d.IDDanToc);

    INSERT INTO BAI_VIET_THE (IDBaiViet, IDThe)
    SELECT @BaiPho, t.IDThe
    FROM THE_NOI_DUNG t
    WHERE t.MaThe = 'PHO'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_THE x WHERE x.IDBaiViet = @BaiPho AND x.IDThe = t.IDThe);

    INSERT INTO BAI_VIET_TU_KHOA (IDBaiViet, IDTuKhoa)
    SELECT @BaiPho, k.IDTuKhoa
    FROM TU_KHOA k
    WHERE k.MaTuKhoa = 'PHO_BO'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_TU_KHOA x WHERE x.IDBaiViet = @BaiPho AND x.IDTuKhoa = k.IDTuKhoa);

    INSERT INTO BAI_VIET_NGUON_THAM_KHAO (IDBaiViet, IDNguon, GhiChuTrichDan, LaNguonChinh)
    SELECT @BaiPho, @NguonPho, N'Nguồn chính cho bài viết phở', 1
    WHERE NOT EXISTS (SELECT 1 FROM BAI_VIET_NGUON_THAM_KHAO WHERE IDBaiViet = @BaiPho AND IDNguon = @NguonPho);

    /* Cong chieng */
    INSERT INTO BAI_VIET_DANH_MUC (IDBaiViet, IDDanhMuc, LaDanhMucChinh)
    SELECT @BaiCongChieng, d.IDDanhMuc, 1
    FROM DANH_MUC_CHU_DE d
    WHERE d.MaDanhMuc = 'NGHE_THUAT_DAN_GIAN'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_DANH_MUC WHERE IDBaiViet = @BaiCongChieng AND IDDanhMuc = d.IDDanhMuc);

    INSERT INTO BAI_VIET_VUNG_VAN_HOA (IDBaiViet, IDVung, LoaiLienHe)
    SELECT @BaiCongChieng, v.IDVung, 'NGUON_GOC'
    FROM VUNG_VAN_HOA v
    WHERE v.MaVung = 'TAY_NGUYEN'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_VUNG_VAN_HOA x WHERE x.IDBaiViet = @BaiCongChieng AND x.IDVung = v.IDVung);

    INSERT INTO BAI_VIET_DAN_TOC (IDBaiViet, IDDanToc, LoaiLienHe)
    SELECT @BaiCongChieng, d.IDDanToc, 'LIEN_QUAN'
    FROM DAN_TOC d
    WHERE d.MaDanToc IN ('EDE','HMONG')
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_DAN_TOC x WHERE x.IDBaiViet = @BaiCongChieng AND x.IDDanToc = d.IDDanToc);

    INSERT INTO BAI_VIET_THE (IDBaiViet, IDThe)
    SELECT @BaiCongChieng, t.IDThe
    FROM THE_NOI_DUNG t
    WHERE t.MaThe = 'CONG_CHIENG'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_THE x WHERE x.IDBaiViet = @BaiCongChieng AND x.IDThe = t.IDThe);

    INSERT INTO BAI_VIET_TU_KHOA (IDBaiViet, IDTuKhoa)
    SELECT @BaiCongChieng, k.IDTuKhoa
    FROM TU_KHOA k
    WHERE k.MaTuKhoa = 'CONG_CHIENG_TAY_NGUYEN'
      AND NOT EXISTS (SELECT 1 FROM BAI_VIET_TU_KHOA x WHERE x.IDBaiViet = @BaiCongChieng AND x.IDTuKhoa = k.IDTuKhoa);

    INSERT INTO BAI_VIET_NGUON_THAM_KHAO (IDBaiViet, IDNguon, GhiChuTrichDan, LaNguonChinh)
    SELECT @BaiCongChieng, @NguonCongChieng, N'Nguồn chính cho bài viết cồng chiêng', 1
    WHERE NOT EXISTS (SELECT 1 FROM BAI_VIET_NGUON_THAM_KHAO WHERE IDBaiViet = @BaiCongChieng AND IDNguon = @NguonCongChieng);

    /* =========================================================
       11. GAN MEDIA CHO BAI VIET + MEDIA THEO VUNG/DAN TOC
       ========================================================= */
    INSERT INTO BAI_VIET_MEDIA (IDBaiViet, IDMedia, ThuTuHienThi, LaMediaChinh, NguCanhSuDung)
    SELECT @BaiTet, @MediaTet, 1, 1, 'ANH_BIA'
    WHERE NOT EXISTS (SELECT 1 FROM BAI_VIET_MEDIA WHERE IDBaiViet = @BaiTet AND IDMedia = @MediaTet);

    INSERT INTO BAI_VIET_MEDIA (IDBaiViet, IDMedia, ThuTuHienThi, LaMediaChinh, NguCanhSuDung)
    SELECT @BaiThoCung, @MediaThoCung, 1, 1, 'ANH_BIA'
    WHERE NOT EXISTS (SELECT 1 FROM BAI_VIET_MEDIA WHERE IDBaiViet = @BaiThoCung AND IDMedia = @MediaThoCung);

    INSERT INTO BAI_VIET_MEDIA (IDBaiViet, IDMedia, ThuTuHienThi, LaMediaChinh, NguCanhSuDung)
    SELECT @BaiAoDai, @MediaAoDai, 1, 1, 'ANH_BIA'
    WHERE NOT EXISTS (SELECT 1 FROM BAI_VIET_MEDIA WHERE IDBaiViet = @BaiAoDai AND IDMedia = @MediaAoDai);

    INSERT INTO BAI_VIET_MEDIA (IDBaiViet, IDMedia, ThuTuHienThi, LaMediaChinh, NguCanhSuDung)
    SELECT @BaiCaTru, @MediaCaTru, 1, 1, 'THAM_KHAO'
    WHERE NOT EXISTS (SELECT 1 FROM BAI_VIET_MEDIA WHERE IDBaiViet = @BaiCaTru AND IDMedia = @MediaCaTru);

    INSERT INTO BAI_VIET_MEDIA (IDBaiViet, IDMedia, ThuTuHienThi, LaMediaChinh, NguCanhSuDung)
    SELECT @BaiNhaRong, @MediaNhaRong, 1, 1, 'ANH_BIA'
    WHERE NOT EXISTS (SELECT 1 FROM BAI_VIET_MEDIA WHERE IDBaiViet = @BaiNhaRong AND IDMedia = @MediaNhaRong);

    INSERT INTO BAI_VIET_MEDIA (IDBaiViet, IDMedia, ThuTuHienThi, LaMediaChinh, NguCanhSuDung)
    SELECT @BaiPho, @MediaPho, 1, 1, 'ANH_BIA'
    WHERE NOT EXISTS (SELECT 1 FROM BAI_VIET_MEDIA WHERE IDBaiViet = @BaiPho AND IDMedia = @MediaPho);

    INSERT INTO BAI_VIET_MEDIA (IDBaiViet, IDMedia, ThuTuHienThi, LaMediaChinh, NguCanhSuDung)
    SELECT @BaiCongChieng, @MediaCongChieng, 1, 1, 'THAM_KHAO'
    WHERE NOT EXISTS (SELECT 1 FROM BAI_VIET_MEDIA WHERE IDBaiViet = @BaiCongChieng AND IDMedia = @MediaCongChieng);

    INSERT INTO MEDIA_VUNG_VAN_HOA (IDMedia, IDVung, ThuTuHienThi)
    SELECT @MediaNhaRong, v.IDVung, 1
    FROM VUNG_VAN_HOA v
    WHERE v.MaVung = 'TAY_NGUYEN'
      AND NOT EXISTS (SELECT 1 FROM MEDIA_VUNG_VAN_HOA WHERE IDMedia = @MediaNhaRong AND IDVung = v.IDVung);

    INSERT INTO MEDIA_VUNG_VAN_HOA (IDMedia, IDVung, ThuTuHienThi)
    SELECT @MediaCongChieng, v.IDVung, 1
    FROM VUNG_VAN_HOA v
    WHERE v.MaVung = 'TAY_NGUYEN'
      AND NOT EXISTS (SELECT 1 FROM MEDIA_VUNG_VAN_HOA WHERE IDMedia = @MediaCongChieng AND IDVung = v.IDVung);

    INSERT INTO MEDIA_DAN_TOC (IDMedia, IDDanToc, ThuTuHienThi)
    SELECT @MediaNhaRong, d.IDDanToc, 1
    FROM DAN_TOC d
    WHERE d.MaDanToc = 'EDE'
      AND NOT EXISTS (SELECT 1 FROM MEDIA_DAN_TOC WHERE IDMedia = @MediaNhaRong AND IDDanToc = d.IDDanToc);

    INSERT INTO MEDIA_DAN_TOC (IDMedia, IDDanToc, ThuTuHienThi)
    SELECT @MediaCongChieng, d.IDDanToc, 1
    FROM DAN_TOC d
    WHERE d.MaDanToc = 'EDE'
      AND NOT EXISTS (SELECT 1 FROM MEDIA_DAN_TOC WHERE IDMedia = @MediaCongChieng AND IDDanToc = d.IDDanToc);

    UPDATE MEDIA SET TrangThai = 'HOAT_DONG' WHERE IDMedia IN (@MediaTet,@MediaThoCung,@MediaAoDai,@MediaCaTru,@MediaNhaRong,@MediaPho,@MediaCongChieng);

    /* =========================================================
       12. BAI VIET LIEN QUAN
       ========================================================= */
    INSERT INTO BAI_VIET_LIEN_QUAN (IDBaiViet, IDBaiVietLienQuan, LoaiLienKet, TrongSo)
    SELECT @BaiTet, @BaiThoCung, 'GOI_Y', 1.70
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_LIEN_QUAN
        WHERE IDBaiViet = @BaiTet AND IDBaiVietLienQuan = @BaiThoCung AND LoaiLienKet = 'GOI_Y'
    );

    INSERT INTO BAI_VIET_LIEN_QUAN (IDBaiViet, IDBaiVietLienQuan, LoaiLienKet, TrongSo)
    SELECT @BaiThoCung, @BaiTet, 'GOI_Y', 1.50
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_LIEN_QUAN
        WHERE IDBaiViet = @BaiThoCung AND IDBaiVietLienQuan = @BaiTet AND LoaiLienKet = 'GOI_Y'
    );

    INSERT INTO BAI_VIET_LIEN_QUAN (IDBaiViet, IDBaiVietLienQuan, LoaiLienKet, TrongSo)
    SELECT @BaiAoDai, @BaiTet, 'CUNG_CHU_DE', 1.10
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_LIEN_QUAN
        WHERE IDBaiViet = @BaiAoDai AND IDBaiVietLienQuan = @BaiTet AND LoaiLienKet = 'CUNG_CHU_DE'
    );

    INSERT INTO BAI_VIET_LIEN_QUAN (IDBaiViet, IDBaiVietLienQuan, LoaiLienKet, TrongSo)
    SELECT @BaiNhaRong, @BaiCongChieng, 'CUNG_VUNG', 1.80
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_LIEN_QUAN
        WHERE IDBaiViet = @BaiNhaRong AND IDBaiVietLienQuan = @BaiCongChieng AND LoaiLienKet = 'CUNG_VUNG'
    );

    INSERT INTO BAI_VIET_LIEN_QUAN (IDBaiViet, IDBaiVietLienQuan, LoaiLienKet, TrongSo)
    SELECT @BaiPho, @BaiTet, 'GOI_Y', 1.20
    WHERE NOT EXISTS (
        SELECT 1 FROM BAI_VIET_LIEN_QUAN
        WHERE IDBaiViet = @BaiPho AND IDBaiVietLienQuan = @BaiTet AND LoaiLienKet = 'GOI_Y'
    );

    /* =========================================================
       13. XUAT BAN BAI VIET
       ========================================================= */
    UPDATE BAI_VIET
    SET TrangThai = 'DA_XUAT_BAN',
        NgayDuyet = SYSUTCDATETIME(),
        IDNguoiDuyet = @ReviewerId,
        NgayXuatBan = SYSUTCDATETIME(),
        IDNguoiXuatBan = @SuperAdminId,
        IDNguoiCapNhat = @SuperAdminId
    WHERE IDBaiViet IN (@BaiTet,@BaiThoCung,@BaiAoDai,@BaiCaTru,@BaiNhaRong,@BaiPho,@BaiCongChieng)
      AND TrangThai <> 'DA_XUAT_BAN';

    /* =========================================================
       14. PHIEN NGUOI DUNG + TIM KIEM + XEM BAI VIET
       ========================================================= */
    SELECT @PhienKhachEN = IDPhien FROM PHIEN_NGUOI_DUNG WHERE URLGioiThieu = N'https://demo.vnculturebridge.ai/landing-en';
    IF @PhienKhachEN IS NULL
    BEGIN
        INSERT INTO PHIEN_NGUOI_DUNG
        (
            LoaiPhien, MaNgonNguUuTien, MaQuocGiaNguoiDung, LoaiThietBi,
            ThongTinTrinhDuyet, URLGioiThieu, DongYPhanTich, KetThucLuc
        )
        VALUES
        (
            'KHACH', 'en', 'US', N'Desktop',
            N'Chrome 135', N'https://demo.vnculturebridge.ai/landing-en', 1, NULL
        );

        SELECT @PhienKhachEN = IDPhien FROM PHIEN_NGUOI_DUNG WHERE URLGioiThieu = N'https://demo.vnculturebridge.ai/landing-en';
    END;

    SELECT @PhienKhachVI = IDPhien FROM PHIEN_NGUOI_DUNG WHERE URLGioiThieu = N'https://demo.vnculturebridge.ai/landing-vi';
    IF @PhienKhachVI IS NULL
    BEGIN
        INSERT INTO PHIEN_NGUOI_DUNG
        (
            LoaiPhien, MaNgonNguUuTien, MaQuocGiaNguoiDung, LoaiThietBi,
            ThongTinTrinhDuyet, URLGioiThieu, DongYPhanTich, KetThucLuc
        )
        VALUES
        (
            'KHACH', 'vi', 'VN', N'Mobile',
            N'Safari iOS', N'https://demo.vnculturebridge.ai/landing-vi', 1, NULL
        );

        SELECT @PhienKhachVI = IDPhien FROM PHIEN_NGUOI_DUNG WHERE URLGioiThieu = N'https://demo.vnculturebridge.ai/landing-vi';
    END;

    IF NOT EXISTS (
        SELECT 1 FROM NHAT_KY_TIM_KIEM
        WHERE IDPhien = @PhienKhachEN AND TuKhoaTimKiem = N'What is Tet?'
    )
    BEGIN
        INSERT INTO NHAT_KY_TIM_KIEM
        (
            IDPhien, TuKhoaTimKiem, MaNgonNgu, KieuTimKiem, SoKetQua, CoKetQuaPhuHop
        )
        VALUES
        (@PhienKhachEN, N'What is Tet?', 'en', 'KET_HOP', 3, 1);
    END;

    IF NOT EXISTS (
        SELECT 1 FROM NHAT_KY_TIM_KIEM
        WHERE IDPhien = @PhienKhachEN AND TuKhoaTimKiem = N'ancestor worship'
    )
    BEGIN
        INSERT INTO NHAT_KY_TIM_KIEM
        (
            IDPhien, TuKhoaTimKiem, MaNgonNgu, KieuTimKiem, SoKetQua, CoKetQuaPhuHop
        )
        VALUES
        (@PhienKhachEN, N'ancestor worship', 'en', 'NGU_NGHIA', 2, 1);
    END;

    IF NOT EXISTS (
        SELECT 1 FROM NHAT_KY_TIM_KIEM
        WHERE IDPhien = @PhienKhachVI AND TuKhoaTimKiem = N'nhà rông'
    )
    BEGIN
        INSERT INTO NHAT_KY_TIM_KIEM
        (
            IDPhien, TuKhoaTimKiem, MaNgonNgu, KieuTimKiem, SoKetQua, CoKetQuaPhuHop
        )
        VALUES
        (@PhienKhachVI, N'nhà rông', 'vi', 'TU_KHOA', 1, 1);
    END;

    IF NOT EXISTS (
        SELECT 1 FROM NHAT_KY_XEM_BAI_VIET WHERE IDPhien = @PhienKhachEN AND IDBaiViet = @BaiTet
    )
    BEGIN
        INSERT INTO NHAT_KY_XEM_BAI_VIET
        (
            IDPhien, IDBaiViet, MaNgonNgu, SoGiayXem, NguonTruyCap
        )
        VALUES
        (@PhienKhachEN, @BaiTet, 'en', 98, 'TIM_KIEM');
    END;

    IF NOT EXISTS (
        SELECT 1 FROM NHAT_KY_XEM_BAI_VIET WHERE IDPhien = @PhienKhachEN AND IDBaiViet = @BaiThoCung
    )
    BEGIN
        INSERT INTO NHAT_KY_XEM_BAI_VIET
        (
            IDPhien, IDBaiViet, MaNgonNgu, SoGiayXem, NguonTruyCap
        )
        VALUES
        (@PhienKhachEN, @BaiThoCung, 'en', 126, 'AI');
    END;

    IF NOT EXISTS (
        SELECT 1 FROM NHAT_KY_XEM_BAI_VIET WHERE IDPhien = @PhienKhachVI AND IDBaiViet = @BaiNhaRong
    )
    BEGIN
        INSERT INTO NHAT_KY_XEM_BAI_VIET
        (
            IDPhien, IDBaiViet, MaNgonNgu, SoGiayXem, NguonTruyCap
        )
        VALUES
        (@PhienKhachVI, @BaiNhaRong, 'vi', 74, 'BAN_DO');
    END;

    /* =========================================================
       15. AI CHAT
       ========================================================= */
    SELECT @PhienChat1 = IDPhienChat
    FROM PHIEN_CHAT_AI
    WHERE IDPhienNguoiDung = @PhienKhachEN AND TieuDeHoiThoai = N'Understanding Tet and ancestor worship';

    IF @PhienChat1 IS NULL
    BEGIN
        INSERT INTO PHIEN_CHAT_AI
        (
            IDPhienNguoiDung, MaNgonNguPhien, MaQuocGiaNguoiDung, TieuDeHoiThoai, KetThucLuc
        )
        VALUES
        (
            @PhienKhachEN, 'en', 'US', N'Understanding Tet and ancestor worship', SYSUTCDATETIME()
        );

        SELECT @PhienChat1 = IDPhienChat
        FROM PHIEN_CHAT_AI
        WHERE IDPhienNguoiDung = @PhienKhachEN AND TieuDeHoiThoai = N'Understanding Tet and ancestor worship';
    END;

    IF NOT EXISTS (SELECT 1 FROM TIN_NHAN_CHAT_AI WHERE IDPhienChat = @PhienChat1 AND ThuTuTinNhan = 1)
    BEGIN
        INSERT INTO TIN_NHAN_CHAT_AI
        (
            IDPhienChat, LoaiNguoiGui, ThuTuTinNhan, MaNgonNgu,
            NoiDungTinNhan, MaYDinh, NgoaiPhamVi, LaNoiDungNhayCam,
            DuCanCuDuLieu
        )
        VALUES
        (
            @PhienChat1, 'NGUOI_DUNG', 1, 'en',
            N'Why is Tet so important in Vietnam?',
            N'EXPLAIN_CULTURE', 0, 0, 1
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM TIN_NHAN_CHAT_AI WHERE IDPhienChat = @PhienChat1 AND ThuTuTinNhan = 2)
    BEGIN
        INSERT INTO TIN_NHAN_CHAT_AI
        (
            IDPhienChat, LoaiNguoiGui, ThuTuTinNhan, MaNgonNgu,
            NoiDungTinNhan, MaYDinh, DiemTinCay, TraLoiTot,
            NgoaiPhamVi, LaNoiDungNhayCam, DuCanCuDuLieu,
            ThoiGianPhanHoiMs, SoPromptToken, SoCompletionToken
        )
        VALUES
        (
            @PhienChat1, 'AI', 2, 'en',
            N'Tet is important because it combines family reunion, ancestor remembrance, and the symbolic beginning of a new year. It is both a festive celebration and a cultural framework for renewing social bonds.',
            N'EXPLAIN_CULTURE', 0.9420, 1,
            0, 0, 1,
            1260, 820, 168
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM TIN_NHAN_CHAT_AI WHERE IDPhienChat = @PhienChat1 AND ThuTuTinNhan = 3)
    BEGIN
        INSERT INTO TIN_NHAN_CHAT_AI
        (
            IDPhienChat, LoaiNguoiGui, ThuTuTinNhan, MaNgonNgu,
            NoiDungTinNhan, MaYDinh, NgoaiPhamVi, LaNoiDungNhayCam,
            DuCanCuDuLieu
        )
        VALUES
        (
            @PhienChat1, 'NGUOI_DUNG', 3, 'en',
            N'Is ancestor worship a religion?',
            N'CLARIFY_CULTURE', 0, 0, 1
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM TIN_NHAN_CHAT_AI WHERE IDPhienChat = @PhienChat1 AND ThuTuTinNhan = 4)
    BEGIN
        INSERT INTO TIN_NHAN_CHAT_AI
        (
            IDPhienChat, LoaiNguoiGui, ThuTuTinNhan, MaNgonNgu,
            NoiDungTinNhan, MaYDinh, DiemTinCay, TraLoiTot,
            NgoaiPhamVi, LaNoiDungNhayCam, DuCanCuDuLieu,
            ThoiGianPhanHoiMs, SoPromptToken, SoCompletionToken
        )
        VALUES
        (
            @PhienChat1, 'AI', 4, 'en',
            N'In many Vietnamese families, ancestor worship is better understood as a cultural and familial practice, although it may overlap with religious life depending on context.',
            N'CLARIFY_CULTURE', 0.9115, 1,
            0, 0, 1,
            1180, 640, 121
        );
    END;

    SELECT @TinNhanAI1 = IDTinNhan FROM TIN_NHAN_CHAT_AI WHERE IDPhienChat = @PhienChat1 AND ThuTuTinNhan = 2;
    SELECT @TinNhanAI2 = IDTinNhan FROM TIN_NHAN_CHAT_AI WHERE IDPhienChat = @PhienChat1 AND ThuTuTinNhan = 4;

    SELECT @PhienChat2 = IDPhienChat
    FROM PHIEN_CHAT_AI
    WHERE IDPhienNguoiDung = @PhienKhachEN AND TieuDeHoiThoai = N'Question outside knowledge scope';

    IF @PhienChat2 IS NULL
    BEGIN
        INSERT INTO PHIEN_CHAT_AI
        (
            IDPhienNguoiDung, MaNgonNguPhien, MaQuocGiaNguoiDung, TieuDeHoiThoai, KetThucLuc
        )
        VALUES
        (
            @PhienKhachEN, 'en', 'US', N'Question outside knowledge scope', SYSUTCDATETIME()
        );

        SELECT @PhienChat2 = IDPhienChat
        FROM PHIEN_CHAT_AI
        WHERE IDPhienNguoiDung = @PhienKhachEN AND TieuDeHoiThoai = N'Question outside knowledge scope';
    END;

    IF NOT EXISTS (SELECT 1 FROM TIN_NHAN_CHAT_AI WHERE IDPhienChat = @PhienChat2 AND ThuTuTinNhan = 1)
    BEGIN
        INSERT INTO TIN_NHAN_CHAT_AI
        (
            IDPhienChat, LoaiNguoiGui, ThuTuTinNhan, MaNgonNgu,
            NoiDungTinNhan, MaYDinh, NgoaiPhamVi, LaNoiDungNhayCam,
            DuCanCuDuLieu
        )
        VALUES
        (
            @PhienChat2, 'NGUOI_DUNG', 1, 'en',
            N'Can you explain Korean palace rituals?',
            N'ASK_OUT_OF_SCOPE', 1, 0, 0
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM TIN_NHAN_CHAT_AI WHERE IDPhienChat = @PhienChat2 AND ThuTuTinNhan = 2)
    BEGIN
        INSERT INTO TIN_NHAN_CHAT_AI
        (
            IDPhienChat, LoaiNguoiGui, ThuTuTinNhan, MaNgonNgu,
            NoiDungTinNhan, MaYDinh, DiemTinCay, TraLoiTot,
            NgoaiPhamVi, LaNoiDungNhayCam, DuCanCuDuLieu,
            ThoiGianPhanHoiMs, SoPromptToken, SoCompletionToken
        )
        VALUES
        (
            @PhienChat2, 'AI', 2, 'en',
            N'I do not have enough grounded data in this knowledge base to explain Korean palace rituals confidently. I can instead help you explore a Vietnamese cultural topic available in the system.',
            N'ASK_OUT_OF_SCOPE', 0.3220, 1,
            1, 0, 0,
            890, 420, 72
        );
    END;

    SELECT @TinNhanAI3 = IDTinNhan FROM TIN_NHAN_CHAT_AI WHERE IDPhienChat = @PhienChat2 AND ThuTuTinNhan = 2;

    IF NOT EXISTS (SELECT 1 FROM CAU_HOI_CAN_BO_SUNG WHERE IDTinNhan = @TinNhanAI3)
    BEGIN
        INSERT INTO CAU_HOI_CAN_BO_SUNG
        (
            IDTinNhan, LyDo, GoiYXuLy, TrangThai
        )
        VALUES
        (
            @TinNhanAI3, 'NGOAI_PHAM_VI',
            N'Cân nhắc mở rộng tri thức sang chủ đề so sánh văn hoá Đông Á nếu phù hợp phạm vi đề tài.',
            'MOI'
        );
    END;

    /* =========================================================
       16. DONG BO TRI THUC AI
       ========================================================= */
    IF NOT EXISTS (
        SELECT 1 FROM DOT_DONG_BO_TRI_THUC_AI
        WHERE LoaiDongBo = 'TANG_DAN' AND TrangThai = 'THANH_CONG'
    )
    BEGIN
        INSERT INTO DOT_DONG_BO_TRI_THUC_AI
        (
            LoaiDongBo, TrangThai, BatDauLuc, KetThucLuc, IDNguoiKichHoat, ThongBaoLoi
        )
        VALUES
        (
            'TANG_DAN', 'THANH_CONG',
            DATEADD(MINUTE, -5, SYSUTCDATETIME()), SYSUTCDATETIME(),
            @AIAdminId, NULL
        );
    END;

    SELECT TOP 1 @DotDongBo1 = IDDotDongBo
    FROM DOT_DONG_BO_TRI_THUC_AI
    WHERE LoaiDongBo = 'TANG_DAN' AND TrangThai = 'THANH_CONG'
    ORDER BY IDDotDongBo DESC;

    IF NOT EXISTS (SELECT 1 FROM CHI_TIET_DONG_BO_TRI_THUC_AI WHERE IDDotDongBo = @DotDongBo1 AND IDBaiViet = @BaiTet)
        INSERT INTO CHI_TIET_DONG_BO_TRI_THUC_AI (IDDotDongBo, IDBaiViet, TrangThai, SoDoanChunk, ThongBaoLoi)
        VALUES (@DotDongBo1, @BaiTet, 'THANH_CONG', 2, NULL);

    IF NOT EXISTS (SELECT 1 FROM CHI_TIET_DONG_BO_TRI_THUC_AI WHERE IDDotDongBo = @DotDongBo1 AND IDBaiViet = @BaiThoCung)
        INSERT INTO CHI_TIET_DONG_BO_TRI_THUC_AI (IDDotDongBo, IDBaiViet, TrangThai, SoDoanChunk, ThongBaoLoi)
        VALUES (@DotDongBo1, @BaiThoCung, 'THANH_CONG', 2, NULL);

    IF NOT EXISTS (SELECT 1 FROM CHI_TIET_DONG_BO_TRI_THUC_AI WHERE IDDotDongBo = @DotDongBo1 AND IDBaiViet = @BaiAoDai)
        INSERT INTO CHI_TIET_DONG_BO_TRI_THUC_AI (IDDotDongBo, IDBaiViet, TrangThai, SoDoanChunk, ThongBaoLoi)
        VALUES (@DotDongBo1, @BaiAoDai, 'THANH_CONG', 2, NULL);

    /* Lay phien ban xuat ban hien tai */
    DECLARE @PhienBanTet BIGINT, @PhienBanThoCung BIGINT, @PhienBanAoDai BIGINT;
    SELECT @PhienBanTet = IDPhienBanXuatBanHienTai FROM BAI_VIET WHERE IDBaiViet = @BaiTet;
    SELECT @PhienBanThoCung = IDPhienBanXuatBanHienTai FROM BAI_VIET WHERE IDBaiViet = @BaiThoCung;
    SELECT @PhienBanAoDai = IDPhienBanXuatBanHienTai FROM BAI_VIET WHERE IDBaiViet = @BaiAoDai;

    IF NOT EXISTS (SELECT 1 FROM TAI_LIEU_TRI_THUC_AI WHERE IDBaiViet = @BaiTet AND MaNgonNgu = 'vi')
    BEGIN
        INSERT INTO TAI_LIEU_TRI_THUC_AI
        (
            IDBaiViet, MaNgonNgu, IDPhienBan, TieuDeTaiLieu,
            MetadataJson, HoatDong, NhaCungCapEmbedding, NgayEmbedding
        )
        VALUES
        (
            @BaiTet, 'vi', @PhienBanTet, N'Tri thức AI - Tết Nguyên Đán (VI)',
            N'{"slug":"tet-nguyen-dan-viet-nam","source":"article","region":["MIEN_BAC","MIEN_TRUNG","MIEN_NAM"]}',
            1, N'openai-text-embedding-demo', SYSUTCDATETIME()
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM TAI_LIEU_TRI_THUC_AI WHERE IDBaiViet = @BaiTet AND MaNgonNgu = 'en')
    BEGIN
        INSERT INTO TAI_LIEU_TRI_THUC_AI
        (
            IDBaiViet, MaNgonNgu, IDPhienBan, TieuDeTaiLieu,
            MetadataJson, HoatDong, NhaCungCapEmbedding, NgayEmbedding
        )
        VALUES
        (
            @BaiTet, 'en', @PhienBanTet, N'AI Knowledge - Tet Nguyen Dan (EN)',
            N'{"slug":"tet-nguyen-dan-viet-nam","source":"article","language":"en"}',
            1, N'openai-text-embedding-demo', SYSUTCDATETIME()
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM TAI_LIEU_TRI_THUC_AI WHERE IDBaiViet = @BaiThoCung AND MaNgonNgu = 'en')
    BEGIN
        INSERT INTO TAI_LIEU_TRI_THUC_AI
        (
            IDBaiViet, MaNgonNgu, IDPhienBan, TieuDeTaiLieu,
            MetadataJson, HoatDong, NhaCungCapEmbedding, NgayEmbedding
        )
        VALUES
        (
            @BaiThoCung, 'en', @PhienBanThoCung, N'AI Knowledge - Ancestor Worship (EN)',
            N'{"slug":"tho-cung-to-tien-viet-nam","source":"article","language":"en"}',
            1, N'openai-text-embedding-demo', SYSUTCDATETIME()
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM TAI_LIEU_TRI_THUC_AI WHERE IDBaiViet = @BaiAoDai AND MaNgonNgu = 'en')
    BEGIN
        INSERT INTO TAI_LIEU_TRI_THUC_AI
        (
            IDBaiViet, MaNgonNgu, IDPhienBan, TieuDeTaiLieu,
            MetadataJson, HoatDong, NhaCungCapEmbedding, NgayEmbedding
        )
        VALUES
        (
            @BaiAoDai, 'en', @PhienBanAoDai, N'AI Knowledge - Ao Dai (EN)',
            N'{"slug":"ao-dai-viet-nam","source":"article","language":"en"}',
            1, N'openai-text-embedding-demo', SYSUTCDATETIME()
        );
    END;

    SELECT @TaiLieuTetVI = IDTaiLieuTriThuc FROM TAI_LIEU_TRI_THUC_AI WHERE IDBaiViet = @BaiTet AND MaNgonNgu = 'vi';
    SELECT @TaiLieuTetEN = IDTaiLieuTriThuc FROM TAI_LIEU_TRI_THUC_AI WHERE IDBaiViet = @BaiTet AND MaNgonNgu = 'en';
    SELECT @TaiLieuThoCungEN = IDTaiLieuTriThuc FROM TAI_LIEU_TRI_THUC_AI WHERE IDBaiViet = @BaiThoCung AND MaNgonNgu = 'en';
    SELECT @TaiLieuAoDaiEN = IDTaiLieuTriThuc FROM TAI_LIEU_TRI_THUC_AI WHERE IDBaiViet = @BaiAoDai AND MaNgonNgu = 'en';

    IF NOT EXISTS (SELECT 1 FROM DOAN_TRI_THUC_AI WHERE IDTaiLieuTriThuc = @TaiLieuTetVI AND SoThuTuDoan = 1)
    BEGIN
        INSERT INTO DOAN_TRI_THUC_AI
        (
            IDTaiLieuTriThuc, SoThuTuDoan, NoiDungDoan, SoToken, KhoaEmbedding, MetadataJson
        )
        VALUES
        (
            @TaiLieuTetVI, 1,
            N'Tết Nguyên Đán là dịp sum họp gia đình, tưởng nhớ tổ tiên và khởi đầu một năm mới trong văn hoá Việt Nam.',
            42, N'emb_tet_vi_001', N'{"section":"intro"}'
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM DOAN_TRI_THUC_AI WHERE IDTaiLieuTriThuc = @TaiLieuTetEN AND SoThuTuDoan = 1)
    BEGIN
        INSERT INTO DOAN_TRI_THUC_AI
        (
            IDTaiLieuTriThuc, SoThuTuDoan, NoiDungDoan, SoToken, KhoaEmbedding, MetadataJson
        )
        VALUES
        (
            @TaiLieuTetEN, 1,
            N'Tet combines family reunion, remembrance of ancestors, and the symbolic beginning of a new year in Vietnam.',
            37, N'emb_tet_en_001', N'{"section":"intro"}'
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM DOAN_TRI_THUC_AI WHERE IDTaiLieuTriThuc = @TaiLieuThoCungEN AND SoThuTuDoan = 1)
    BEGIN
        INSERT INTO DOAN_TRI_THUC_AI
        (
            IDTaiLieuTriThuc, SoThuTuDoan, NoiDungDoan, SoToken, KhoaEmbedding, MetadataJson
        )
        VALUES
        (
            @TaiLieuThoCungEN, 1,
            N'Ancestor worship in Vietnam is often understood as a cultural and familial practice linked to filial piety and continuity.',
            39, N'emb_ancestor_en_001', N'{"section":"meaning"}'
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM DOAN_TRI_THUC_AI WHERE IDTaiLieuTriThuc = @TaiLieuAoDaiEN AND SoThuTuDoan = 1)
    BEGIN
        INSERT INTO DOAN_TRI_THUC_AI
        (
            IDTaiLieuTriThuc, SoThuTuDoan, NoiDungDoan, SoToken, KhoaEmbedding, MetadataJson
        )
        VALUES
        (
            @TaiLieuAoDaiEN, 1,
            N'The ao dai is a visual symbol of Vietnamese elegance and cultural identity in both traditional and modern settings.',
            35, N'emb_aodai_en_001', N'{"section":"symbolism"}'
        );
    END;

    SELECT @DoanTetVI1 = IDDoan FROM DOAN_TRI_THUC_AI WHERE IDTaiLieuTriThuc = @TaiLieuTetVI AND SoThuTuDoan = 1;
    SELECT @DoanTetEN1 = IDDoan FROM DOAN_TRI_THUC_AI WHERE IDTaiLieuTriThuc = @TaiLieuTetEN AND SoThuTuDoan = 1;
    SELECT @DoanThoCungEN1 = IDDoan FROM DOAN_TRI_THUC_AI WHERE IDTaiLieuTriThuc = @TaiLieuThoCungEN AND SoThuTuDoan = 1;
    SELECT @DoanAoDaiEN1 = IDDoan FROM DOAN_TRI_THUC_AI WHERE IDTaiLieuTriThuc = @TaiLieuAoDaiEN AND SoThuTuDoan = 1;

    IF NOT EXISTS (SELECT 1 FROM TRICH_DAN_TIN_NHAN_AI WHERE IDTinNhan = @TinNhanAI1 AND IDDoan = @DoanTetEN1)
    BEGIN
        INSERT INTO TRICH_DAN_TIN_NHAN_AI
        (
            IDTinNhan, IDTaiLieuTriThuc, IDDoan, ThuTuTrichDan, DoanTrichYeu
        )
        VALUES
        (
            @TinNhanAI1, @TaiLieuTetEN, @DoanTetEN1, 1,
            N'Tet combines family reunion, remembrance of ancestors, and a symbolic new beginning.'
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM TRICH_DAN_TIN_NHAN_AI WHERE IDTinNhan = @TinNhanAI2 AND IDDoan = @DoanThoCungEN1)
    BEGIN
        INSERT INTO TRICH_DAN_TIN_NHAN_AI
        (
            IDTinNhan, IDTaiLieuTriThuc, IDDoan, ThuTuTrichDan, DoanTrichYeu
        )
        VALUES
        (
            @TinNhanAI2, @TaiLieuThoCungEN, @DoanThoCungEN1, 1,
            N'Ancestor worship is often a cultural and familial practice rather than a single doctrinal religion.'
        );
    END;

    /* =========================================================
       17. PHAN HOI NOI DUNG
       ========================================================= */
    IF NOT EXISTS (
        SELECT 1 FROM PHAN_HOI_NOI_DUNG
        WHERE IDPhien = @PhienKhachEN AND LoaiPhanHoi = 'BAI_VIET' AND IDBaiViet = @BaiTet
    )
    BEGIN
        INSERT INTO PHAN_HOI_NOI_DUNG
        (
            IDPhien, LoaiPhanHoi, IDBaiViet, DiemDanhGia, HuuIch, NoiDungPhanHoi,
            TrangThaiXuLy, IDNguoiXuLy, NgayXuLy
        )
        VALUES
        (
            @PhienKhachEN, 'BAI_VIET', @BaiTet, 5, 1,
            N'Bài viết dễ hiểu và giải thích rõ vì sao Tết quan trọng.',
            'DA_XU_LY', @ContentAdminId, SYSUTCDATETIME()
        );
    END;

    IF NOT EXISTS (
        SELECT 1 FROM PHAN_HOI_NOI_DUNG
        WHERE IDPhien = @PhienKhachEN AND LoaiPhanHoi = 'TRA_LOI_AI' AND IDTinNhan = @TinNhanAI2
    )
    BEGIN
        INSERT INTO PHAN_HOI_NOI_DUNG
        (
            IDPhien, LoaiPhanHoi, IDTinNhan, DiemDanhGia, HuuIch, NoiDungPhanHoi,
            TrangThaiXuLy, IDNguoiXuLy, NgayXuLy
        )
        VALUES
        (
            @PhienKhachEN, 'TRA_LOI_AI', @TinNhanAI2, 5, 1,
            N'The explanation was nuanced and did not overstate certainty.',
            'DA_XEM', @AIAdminId, SYSUTCDATETIME()
        );
    END;

    IF NOT EXISTS (
        SELECT 1 FROM PHAN_HOI_NOI_DUNG
        WHERE IDPhien = @PhienKhachVI AND LoaiPhanHoi = 'CHUNG'
    )
    BEGIN
        INSERT INTO PHAN_HOI_NOI_DUNG
        (
            IDPhien, LoaiPhanHoi, DiemDanhGia, HuuIch, NoiDungPhanHoi,
            TrangThaiXuLy
        )
        VALUES
        (
            @PhienKhachVI, 'CHUNG', 4, 1,
            N'Giao diện dễ dùng, nên bổ sung thêm bài về phong tục cưới hỏi.',
            'MOI'
        );
    END;

    /* =========================================================
       18. NHAT KY QUAN TRI
       ========================================================= */
    IF NOT EXISTS (
        SELECT 1 FROM NHAT_KY_QUAN_TRI
        WHERE IDNguoiDung = @ContentAdminId AND TenThucThe = 'BAI_VIET' AND GiaTriKhoa = CAST(@BaiTet AS NVARCHAR(100))
    )
    BEGIN
        INSERT INTO NHAT_KY_QUAN_TRI
        (
            IDNguoiDung, LoaiHanhDong, TenThucThe, GiaTriKhoa,
            DuLieuCuJson, DuLieuMoiJson, GhiChu
        )
        VALUES
        (
            @ContentAdminId, 'TAO_MOI', 'BAI_VIET', CAST(@BaiTet AS NVARCHAR(100)),
            NULL,
            N'{"slug":"tet-nguyen-dan-viet-nam","status":"NHAP"}',
            N'Tạo bài viết Tết'
        );
    END;

    IF NOT EXISTS (
        SELECT 1 FROM NHAT_KY_QUAN_TRI
        WHERE IDNguoiDung = @ReviewerId AND TenThucThe = 'BAI_VIET' AND GiaTriKhoa = CAST(@BaiThoCung AS NVARCHAR(100)) AND LoaiHanhDong = 'DUYET'
    )
    BEGIN
        INSERT INTO NHAT_KY_QUAN_TRI
        (
            IDNguoiDung, LoaiHanhDong, TenThucThe, GiaTriKhoa,
            DuLieuCuJson, DuLieuMoiJson, GhiChu
        )
        VALUES
        (
            @ReviewerId, 'DUYET', 'BAI_VIET', CAST(@BaiThoCung AS NVARCHAR(100)),
            N'{"status":"CHO_DUYET"}',
            N'{"status":"DA_DUYET"}',
            N'Duyệt nội dung thờ cúng tổ tiên'
        );
    END;

    IF NOT EXISTS (
        SELECT 1 FROM NHAT_KY_QUAN_TRI
        WHERE IDNguoiDung = @AIAdminId AND TenThucThe = 'DOT_DONG_BO_TRI_THUC_AI' AND GiaTriKhoa = CAST(@DotDongBo1 AS NVARCHAR(100))
    )
    BEGIN
        INSERT INTO NHAT_KY_QUAN_TRI
        (
            IDNguoiDung, LoaiHanhDong, TenThucThe, GiaTriKhoa,
            DuLieuCuJson, DuLieuMoiJson, GhiChu
        )
        VALUES
        (
            @AIAdminId, 'KICH_HOAT_DONG_BO', 'DOT_DONG_BO_TRI_THUC_AI', CAST(@DotDongBo1 AS NVARCHAR(100)),
            NULL,
            N'{"type":"TANG_DAN","status":"THANH_CONG"}',
            N'Đồng bộ tri thức AI thành công'
        );
    END;

    COMMIT TRAN;

    /* =========================================================
       19. KIEM TRA NHANH
       ========================================================= */
    SELECT IDNguoiDung, TenDangNhap, HoTen, TrangThai
    FROM QUAN_TRI_NGUOI_DUNG
    WHERE TenDangNhap IN (N'superadmin', N'contentadmin', N'reviewer', N'aiadmin');

    SELECT IDBaiViet, DuongDanSeo, LoaiBaiViet, TrangThai, TrangThaiDongBoAI, IDPhienBanXuatBanHienTai
    FROM BAI_VIET
    WHERE IDBaiViet IN (@BaiTet,@BaiThoCung,@BaiAoDai,@BaiCaTru,@BaiNhaRong,@BaiPho,@BaiCongChieng)
    ORDER BY IDBaiViet;

    SELECT IDBaiViet, MaNgonNgu, TieuDe, TrangThaiBanDich
    FROM BAI_VIET_BAN_DICH
    WHERE IDBaiViet IN (@BaiTet,@BaiThoCung,@BaiAoDai,@BaiCaTru,@BaiNhaRong,@BaiPho,@BaiCongChieng)
    ORDER BY IDBaiViet, MaNgonNgu;

    SELECT TOP 20 *
    FROM PHIEN_BAN_BAI_VIET
    WHERE IDBaiViet IN (@BaiTet,@BaiThoCung,@BaiAoDai,@BaiCaTru,@BaiNhaRong,@BaiPho,@BaiCongChieng)
    ORDER BY IDPhienBan DESC;

    SELECT TOP 20 *
    FROM LICH_SU_TRANG_THAI_BAI_VIET
    WHERE IDBaiViet IN (@BaiTet,@BaiThoCung,@BaiAoDai,@BaiCaTru,@BaiNhaRong,@BaiPho,@BaiCongChieng)
    ORDER BY IDLichSu DESC;

    SELECT TOP 20 *
    FROM TIN_NHAN_CHAT_AI
    WHERE IDPhienChat IN (@PhienChat1,@PhienChat2)
    ORDER BY IDTinNhan;

END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRAN;

    THROW;
END CATCH;